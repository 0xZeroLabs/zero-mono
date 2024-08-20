import {
  getAligned,
  VerificationData,
  Option,
  ProvingSystemId,
} from "aligned-ts";
import { ethers } from "ethers";

const aligned = getAligned();

export const verify = (
  proof: Buffer | Uint8Array,
  publicInput: Option<Buffer | Uint8Array>,
  verificationKey: Option<Buffer | Uint8Array>
) => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const verificationData = {
    proof,
    publicInput,
    verificationKey,
    provingSystem: ProvingSystemId.Groth16Bn254,
    proofGeneratorAddress: wallet.address,
  };
  aligned.submit(verificationData as VerificationData, wallet);
};
