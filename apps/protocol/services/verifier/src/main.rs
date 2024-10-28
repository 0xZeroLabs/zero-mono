use actix_web::{middleware, web, App, HttpResponse, HttpServer};
use aligned_sdk::core::types::{Network, PriceEstimate, ProvingSystemId, VerificationData};
use aligned_sdk::sdk::{estimate_fee, get_next_nonce, submit_and_wait_verification};
use dotenv::dotenv;
use ethers::signers::{LocalWallet, Signer};
use log::{error, info};
use serde::{Deserialize, Serialize};
use std::env;
use std::str::FromStr;

const BATCHER_URL: &str = "wss://batcher.alignedlayer.com";
const NETWORK: Network = Network::Holesky;

#[derive(Serialize, Deserialize)]
struct VerificationRequest {
    proof: Vec<u8>,
    verification_key: Vec<u8>,
    pub_input: Vec<u8>,
}

#[derive(Serialize, Deserialize, Debug)]
struct VerificationResponse {
    success: bool,
    error: Option<String>,
}

async fn verify_proof(
    verification_data: VerificationData,
    rpc_url: &str,
    wallet: &LocalWallet,
) -> Result<Option<String>, Box<dyn std::error::Error>> {
    let nonce = get_next_nonce(rpc_url, wallet.address(), NETWORK)
        .await
        .expect("Failed to get next nonce");
    let max_fee = estimate_fee(&rpc_url, PriceEstimate::Default)
        .await
        .expect("failed to fetch gas price from the blockchain");

    match submit_and_wait_verification(
        BATCHER_URL,
        &rpc_url,
        NETWORK,
        &verification_data,
        max_fee,
        wallet.clone(),
        nonce,
    )
    .await
    {
        Ok(aligned_verification_data) => {
            let batch_root = hex::encode(aligned_verification_data.batch_merkle_root);
            info!("Verification successful. Batch root: {}", batch_root);
            Ok(None)
        }
        Err(e) => {
            error!("Verification error: {}", e);
            Ok(Some(e.to_string()))
        }
    }
}

async fn verify_handler(
    req: web::Json<VerificationRequest>,
    wallet: web::Data<LocalWallet>,
    rpc_url: web::Data<String>,
) -> Result<HttpResponse, actix_web::Error> {
    let req = req.into_inner();

    let verification_data = VerificationData {
        proving_system: ProvingSystemId::Groth16Bn254,
        proof: req.proof,
        pub_input: Some(req.pub_input),
        verification_key: Some(req.verification_key),
        vm_program_code: None,
        proof_generator_addr: wallet.address(),
    };

    match verify_proof(verification_data, &rpc_url, &wallet).await {
        Ok(error) => Ok(HttpResponse::Ok().json(VerificationResponse {
            success: error.is_none(),
            error,
        })),
        Err(e) => Ok(
            HttpResponse::InternalServerError().json(VerificationResponse {
                success: false,
                error: Some(e.to_string()),
            }),
        ),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let rpc_url = env::var("RPC_URL").expect("RPC_URL must be set");
    let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set");

    let wallet = LocalWallet::from_str(&private_key)
        .expect("Failed to create wallet")
        .with_chain_id(17000u64);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(wallet.clone()))
            .app_data(web::Data::new(rpc_url.clone()))
            .wrap(middleware::Logger::default())
            .service(web::resource("/verify").route(web::post().to(verify_handler)))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

#[cfg(test)]
mod tests {
    use super::*;
    use actix_web::{test, web, App};
    // use base64::{engine::general_purpose, Engine as _};
    use mockall::mock;
    use mockall::predicate::*;

    // What We're Testing:
    // - The HTTP endpoint is working correctly
    // - The service can handle JSON requests
    // - The service properly processes invalid proofs (returns appropriate error)
    // - The error handling system works as expected
    // - The service integrates correctly with its dependencies (wallet, RPC)

    // What We're Not Testing:
    // - Actual cryptographic verification (that would require valid proof/verification key pairs)
    // - Network interactions with the blockchain
    // - Real wallet transactions

    //mock for verification-related functions
    mock! {
        VerificationSystem {
            async fn mock_verify_proof(
                verification_data: VerificationData,
                rpc_url: &str,
                wallet: &LocalWallet,
            ) -> Result<Option<String>, Box<dyn std::error::Error>>;
        }
    }

    #[actix_web::test]
    async fn test_verify_handler() {
        dotenv().ok();

        let rpc_url = env::var("RPC_URL").unwrap_or_else(|_| "http://localhost:8545".to_string());
        let private_key = env::var("PRIVATE_KEY").unwrap_or_else(|_| {
            "0000000000000000000000000000000000000000000000000000000000000001".to_string()
        });

        let wallet = LocalWallet::from_str(&private_key)
            .expect("Failed to create wallet")
            .with_chain_id(17000u64);

        let proof = vec![1, 2, 3, 4]; // replace with valid test proof
        let verification_key = vec![5, 6, 7, 8]; // replace with valid test verification key
        let pub_input = vec![9, 10]; // replace with valid test public input

        let req = VerificationRequest {
            proof: proof.clone(),
            verification_key: verification_key.clone(),
            pub_input: pub_input.clone(),
        };

        let app = test::init_service(
            App::new()
                .app_data(web::Data::new(wallet.clone()))
                .app_data(web::Data::new(rpc_url.clone()))
                .service(web::resource("/verify").route(web::post().to(verify_handler))),
        )
        .await;

        let resp = test::call_service(
            &app,
            test::TestRequest::post()
                .uri("/verify")
                .set_json(&req)
                .to_request(),
        )
        .await;

        // Check response
        assert!(resp.status().is_success());
        let body: VerificationResponse = test::read_body_json(resp).await;

        // For debugging (run test with: cargo test -- --nocapture)
        eprintln!("Response body: {:?}", body);
        eprintln!("Proof length: {}", proof.len());
        eprintln!("Verification key length: {}", verification_key.len());
        eprintln!("Public input length: {}", pub_input.len());

        // Test can be adjusted based on expected behavior:
        // If we expect verification to fail with test data:
        assert!(!body.success);
        assert!(body.error.is_some());
        assert_eq!(body.error.clone().unwrap(), "Invalid proof");

        // If we expect verification to succeed with test data:
        // assert!(body.success);
        // assert!(body.error.is_none());
    }
}
