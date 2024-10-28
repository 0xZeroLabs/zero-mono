CREATE TABLE IF NOT EXISTS "email" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(256) NOT NULL,
	"created_at" date DEFAULT 'NOW()',
	CONSTRAINT "email_address_unique" UNIQUE("address")
);
