CREATE TYPE "public"."status_option" AS ENUM('ANALIZANDO', 'EM ANDAMENTO', 'CONCLUIDO');--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" text PRIMARY KEY NOT NULL,
	"conteudo" text NOT NULL,
	"status" "status_option" DEFAULT 'ANALIZANDO',
	"nome" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
