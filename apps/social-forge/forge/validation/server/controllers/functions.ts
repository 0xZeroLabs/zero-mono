import { verify } from "tlsn-js";
import { Proof } from "tlsn-js/build/types";

export const verifyProof = async (
  proof: Proof,
): Promise<{
  time: number;
  sent: string;
  recv: string;
  notaryUrl: string;
}> => {
  return await verify(proof);
};
