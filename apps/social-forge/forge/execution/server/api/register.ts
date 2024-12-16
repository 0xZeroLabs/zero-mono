import { registerNFTasIP, verifyProof } from "~/controllers/functions";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const response = await registerNFTasIP();
  return {
    response,
  };
});
