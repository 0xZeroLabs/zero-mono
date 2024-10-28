import { ethers } from "ethers";
import { getBytes, hexlify, toUtf8Bytes } from "ethers";
import { keccak256 } from "ethers";

// proof_generation.ts
import sindri from "sindri";

export const generateProof = async (
  message: string,
  wallet: ethers.HDNodeWallet | ethers.Wallet
) => {
  const circuitInputs = { private_key: "5837da14afbb1229eae18d07700b0e6ec2b6407384a08ef25fde3d55ea846962", message: "hello world" };

  try {
    const proof = await sindri.proveCircuit(
      "verify-ecdsa:latest",
      JSON.stringify(circuitInputs)
    );
    return proof;
  } catch (error) {
    console.error("Proof generation error:", error);
    return { error };
  }
};

// usage.ts
const message = "Hello World";
const wallet = ethers.Wallet.createRandom();

generateProof(message, wallet).then(console.log);
