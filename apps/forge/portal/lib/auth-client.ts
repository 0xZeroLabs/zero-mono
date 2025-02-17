import { createAuthClient } from "better-auth/vue";
import {
  magicLinkClient,
  organizationClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL,
  plugins: [magicLinkClient(), organizationClient()],
});
