import { sendOtp } from "./controllers/stytch.controller";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await sendOtp(body.email);
  return {
    response: response,
  };
});