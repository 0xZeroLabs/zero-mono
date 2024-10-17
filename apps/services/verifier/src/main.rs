use actix_web::{web, App, HttpResponse, HttpServer, Middleware};
use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use std::env;
use aligned_sdk::core::types::{
    AlignedVerificationData, Network, PriceEstimate, ProvingSystemId, VerificationData,
};
use aligned_sdk::sdk::{estimate_fee, get_next_nonce, submit_and_wait_verification};
use std::str::FromStr;
use web3::types::U256;

const BATCHER_PAYMENTS_ADDRESS: &str = "0x815aeCA64a974297942D2Bbf034ABEe22a38A003";
const ADDRESS: &str = "wallet_address";
const NETWORK: Network = Network::Holesky;

#[derive(Deserialize)]
struct VerificationRequest {
    proof: Vec<u8>,
    verification_key: Vec<u8>,
    pub_input: Vec<u8>,
}

#[derive(Serialize)]
struct VerificationResponse {
    success: bool,
    error: Option<String>,
}

async fn verify_proof(
    proof: Vec<u8>,
    verification_key: Vec<u8>,
    pub_input: Vec<u8>,
    rpc_url: &str,
    private_key: &str,
) -> Result<(bool, Option<String>), Box<dyn std::error::Error>> {
    let verification_data = VerificationData {
        proving_system: ProvingSystemId::Groth16Bn254,
        proof,
        proof_generator_addr: ADDRESS.to_string(),
        verification_key,
        pub_input,
    };

    let nonce = get_next_nonce(rpc_url, ADDRESS, NETWORK).await?;
    let max_fee: U256 = estimate_fee(rpc_url, PriceEstimate::Default).await?;

    match submit_and_wait_verification(
        BATCHER_PAYMENTS_ADDRESS,
        rpc_url,
        NETWORK,
        &verification_data,
        max_fee,
        private_key,
        nonce,
    )
    .await
    {
        Ok(maybe_aligned_verification_data) => match maybe_aligned_verification_data {
            Some(aligned_verification_data) => {
                let batch_root = hex::encode(aligned_verification_data.batch_merkle_root);
                Ok((true, None))
            }
            None => Ok((false, Some("No verification data".to_string()))),
        },
        Err(e) => Ok((false, Some(e.to_string()))),
    }
}

async fn verify_handler(
    req: web::Json<VerificationRequest>,
) -> Result<HttpResponse, actix_web::Error> {
    let private_key = env::var("PRIVATE_KEY").expect("PRIVATE_KEY must be set");
    let rpc_url = env::var("RPC_URL").expect("RPC_URL must be set");

    match verify_proof(
        req.proof.clone(),
        req.verification_key.clone(),
        req.pub_input.clone(),
        &rpc_url,
        &private_key,
    )
    .await
    {
        Ok((success, error)) => Ok(HttpResponse::Ok().json(VerificationResponse {
            success,
            error,
        })),
        Err(e) => Ok(HttpResponse::InternalServerError().json(VerificationResponse {
            success: false,
            error: Some(e.to_string()),
        })),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    HttpServer::new(|| {
        App::new().service(
            web::resource("/api/verify")
                .route(web::post().to(verify_handler))
        )
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}