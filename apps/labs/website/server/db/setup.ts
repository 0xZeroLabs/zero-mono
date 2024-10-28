import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const postgresURL = process.env.PGURL as string;
const queryClient = postgres(postgresURL);
export const db = drizzle(queryClient);
