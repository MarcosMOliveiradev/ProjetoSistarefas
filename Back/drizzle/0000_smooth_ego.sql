CREATE TYPE "public"."category_enum" AS ENUM('COMPRAS', 'ALMOXARIFADO', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('TODOS', 'ALMOXARIFADO', 'COMPRAS', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS');--> statement-breakpoint
CREATE TABLE "media_roles" (
	"media_id" text NOT NULL,
	"role" "roles" NOT NULL,
	CONSTRAINT "media_roles_media_id_role_pk" PRIMARY KEY("media_id","role")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"customer_id" text NOT NULL,
	"category" "category_enum" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" text NOT NULL,
	"role" text NOT NULL,
	CONSTRAINT "user_roles_user_id_role_pk" PRIMARY KEY("user_id","role")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"matricula" numeric NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_matricula_unique" UNIQUE("matricula"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "media_roles" ADD CONSTRAINT "media_roles_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_customer_id_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "media_roles_role_idx" ON "media_roles" USING btree ("role");--> statement-breakpoint
CREATE INDEX "user_roles_role_idx" ON "user_roles" USING btree ("role");