import { addWaitlist } from "./waitlist.controller";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const response = await addWaitlist(body.email);
  return {
    response: response,
  };
});
