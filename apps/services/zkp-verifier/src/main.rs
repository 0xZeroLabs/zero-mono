use aligned_sdk::sdk::{submit_and_wait_verification, get_next_nonce};
use aligned_sdk::types::{ProvingSystemId, VerificationData};
use ethers::prelude::*;

const RPC_URL: &str = "https://ethereum-holesky-rpc.publicnode.com";
const BATCHER_URL: &str = "wss://batcher.alignedlayer.com";
const BATCHER_ADDRESS: &str = "0x815aeCA64a974297942D2Bbf034ABEe22a38A003";
const ELF: &[u8] = include_bytes!("../../program/elf/riscv32im-succinct-zkvm-elf");

async fn submit_proof_to_aligned(
    proof: Vec<u8>,
    wallet: Wallet<SigningKey>
) -> Result<AlignedVerificationData, anyhow::Error> {
    let verification_data = VerificationData {
        proving_system: ProvingSystemId::SP1,
        proof,
        proof_generator_addr: wallet.address(),
        vm_program_code: Some(ELF.to_vec()),
        verification_key: None,
        pub_input: None,
    };

    let nonce = get_next_nonce(RPC_URL, wallet.address(), BATCHER_CONTRACT_ADDRESS)
        .await
        .map_err(|e| anyhow::anyhow!("Failed to get next nonce: {:?}", e))?;

    match submit_and_wait_verification(
        BATCHER_URL,
        RPC_URL,
        Chain::Holesky,
        &verification_data,
        wallet,
        nonce,
        BATCHER_CONTRACT_ADDRESS
    ).await.map_err(|e| anyhow::anyhow!("Failed to submit proof: {:?}", e))
}

#[tokio::main]
async fn main() {
    let wallet = ""
    let proof = ""

    match submit_proof_to_aligned(proof, wallet).await {
        Ok(aligned_verification_data) => println!("Proof submitted successfully"),
        Err(err) => println!("Error: {:?}", err),
    }
}