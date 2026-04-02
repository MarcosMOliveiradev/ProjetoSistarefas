ALTER TABLE "media" RENAME COLUMN "name" TO "titulo";--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "url" text NOT NULL;