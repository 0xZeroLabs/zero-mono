import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

config();
const client = new Client({
  connectionString: process.env.PGURL,
});

(async () => {
  await client.connect();
})();

export const db = drizzle(client, {schema});
