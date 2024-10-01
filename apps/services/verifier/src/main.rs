use aligned_sdk::core::types::{AlignedVerificationData, Chain, ProvingSystemId, VerificationData};
use aligned_sdk::sdk::{get_next_nonce, submit_and_wait};

const BATCHER_PAYMENTS_ADDRESS: &str = "0x815aeCA64a974297942D2Bbf034ABEe22a38A003";

fn main() {
    let rpc_url = args.rpc_url.clone();
    let keystore_password = rpassword::prompt_password("Enter keystore password: ")
        .expect("Failed to read keystore password");
    let wallet = LocalWallet::decrypt_keystore(args.keystore_path, &keystore_password)
        .expect("Failed to decrypt keystore")
        .with_chain_id(17000u64);

    // Call to SDK:
    let nonce = get_next_nonce(&rpc_url, wallet.address(), BATCHER_PAYMENTS_ADDRESS)
        .await
        .expect("Failed to get next nonce");
}
