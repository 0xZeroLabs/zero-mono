import { relations } from "drizzle-orm";
import {
  date,
  text,
  pgTable,
  varchar,
  serial,
  primaryKey,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const email = pgTable("email", {
  id: serial("id").primaryKey(),
  address: varchar("address", { length: 256 }).notNull().unique(),
  createdAt: date("created_at").default("NOW()"),
});

export const insertEmailSchema = createInsertSchema(email, {});
