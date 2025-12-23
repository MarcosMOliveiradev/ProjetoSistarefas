CREATE TYPE "public"."category_enum" AS ENUM('COMPRAS', 'ALMOXARIFADO', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('TODOS', 'ALMOXARIFADO', 'COMPRAS', 'SECRETARIA', 'FINANCEIRO', 'DP', 'INFORMATICA', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS');--> statement-breakpoint
CREATE TABLE "Atividade" (
	"cod_atividade" integer PRIMARY KEY NOT NULL,
	"setor" text NOT NULL,
	"descricao" text NOT NULL,
	"tempo_medio" integer DEFAULT 60 NOT NULL,
	"usuario" text
);
--> statement-breakpoint
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
CREATE TABLE "tarefas" (
	"id" text PRIMARY KEY NOT NULL,
	"data" text NOT NULL,
	"item" integer NOT NULL,
	"cod_atividade" integer,
	"qtd_folha" integer NOT NULL,
	"h_inicio" integer NOT NULL,
	"h_termino" integer NOT NULL,
	"ativado" boolean DEFAULT true NOT NULL,
	"usuario" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"user_id" text NOT NULL,
	"role" "roles" NOT NULL,
	CONSTRAINT "user_roles_user_id_role_pk" PRIMARY KEY("user_id","role")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"matricula" integer NOT NULL,
	"password" text NOT NULL,
	"avatar_url" text,
	"ativado" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_matricula_unique" UNIQUE("matricula")
);
--> statement-breakpoint
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_usuario_user_id_fk" FOREIGN KEY ("usuario") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media_roles" ADD CONSTRAINT "media_roles_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_customer_id_user_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_cod_atividade_Atividade_cod_atividade_fk" FOREIGN KEY ("cod_atividade") REFERENCES "public"."Atividade"("cod_atividade") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_usuario_user_id_fk" FOREIGN KEY ("usuario") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "media_roles_role_idx" ON "media_roles" USING btree ("role");--> statement-breakpoint
CREATE INDEX "user_roles_role_idx" ON "user_roles" USING btree ("role");