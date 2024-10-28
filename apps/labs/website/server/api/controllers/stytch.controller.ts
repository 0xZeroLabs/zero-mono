import { config } from "dotenv";
import { envs } from "stytch";
import * as stytch from "stytch";

const client = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID!,
  secret: process.env.STYTCH_SECRET!,
  env: envs.test,
});

export const sendOtp = (email: string) =>
  client.otps.email
    .loginOrCreate({ email })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

export const verifyOtp = (method_id: string, code: string) =>
  client.otps
    .authenticate({ method_id, code })
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
