import { verifyOtp } from "./controllers/stytch.controller";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await verifyOtp(body.methodId, body.code);
  return {
    response: response,
  };
});