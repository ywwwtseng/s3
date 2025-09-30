CREATE TABLE "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"mime" text NOT NULL,
	"data" text NOT NULL,
	"expires_at" timestamp
);
