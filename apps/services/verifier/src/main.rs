use aligned_sdk::core::types::{
    AlignedVerificationData, Network, PriceEstimate, ProvingSystemId, VerificationData,
};
use aligned_sdk::sdk::{estimate_fee, get_next_nonce, submit_and_wait};

const BATCHER_PAYMENTS_ADDRESS: &str = "0x815aeCA64a974297942D2Bbf034ABEe22a38A003";
const ADDRESS: &str = "wallet_address";
const NETWORK: Network = Network::Holesky;

pub async fn verify_proof(proof: Vec<u8>, verification_key: Vec<u8>, pub_input: Vec<u8>) -> Result<(bool, std::io::Error), std::io::Error> {
    let rpc_url = args.rpc_url.clone();
    let verification_data = VerificationData {
        proving_system: ProvingSystemId::GnarkPlonkBn254,
        proof,
        proof_generator_addr: ADDRESS,
        vm_program_code: Some(ELF.to_vec()),
        verification_key,
        pub_input,
    };

    let nonce = get_next_nonce(&rpc_url, ADDRESS, NETWORK)
        .await
        .expect("Failed to get next nonce");

    let max_fee: U256 = estimate_fee(&rpc_url, PriceEstimate::Default)
        .await
        .unwrap();

    match submit_and_wait_verification(
        BATCHER_URL,
        &rpc_url,
        Network::Holesky,
        &verification_data,
        max_fee,
        "private_key",
        nonce,
    )
    .await
    {
        Ok(maybe_aligned_verification_data) => match maybe_aligned_verification_data {
            Some(aligned_verification_data) => {
                println!(
                    "Proof submitted and verified successfully on batch {}",
                    hex::encode(aligned_verification_data.batch_merkle_root)
                );
                return Ok((true, aligned_verification_data));
            }
            None => {
                println!("Proof submission failed. No verification data");
                return Ok((false, std::io::Error::new(std::io::ErrorKind::Other, "No verification data")));
            }
        },
        Err(e) => {
            println!("Proof verification failed: {:?}", e);
            return Ok((false, e));
        }
    }
}
