CREATE TABLE "analises_mensais" (
	"id" text PRIMARY KEY NOT NULL,
	"usuario_id" text NOT NULL,
	"mes" integer NOT NULL,
	"ano" integer NOT NULL,
	"dias_esperados" integer NOT NULL,
	"dias_cumpridos" integer NOT NULL,
	"percentual" numeric(5, 2) NOT NULL,
	"selo" "selo" NOT NULL,
	"pdf_path" text NOT NULL,
	"gerado_em" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "grupos" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"dias_empresa" integer[] NOT NULL,
	"dias_instituicao" integer[] NOT NULL,
	"data_inicio" date NOT NULL,
	"data_fim" date
);
--> statement-breakpoint
CREATE TABLE "presenca" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"data" date NOT NULL,
	"tipo_esperado" "tipo_esperado" NOT NULL,
	"status" "status_presenca" DEFAULT 'PENDENTE' NOT NULL,
	"hora_entrada" time,
	"origem" "origem_presenca" NOT NULL,
	CONSTRAINT "presenca_user_id_data_unique" UNIQUE("user_id","data")
);
--> statement-breakpoint
CREATE TABLE "user_grupos" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"grupo_id" text NOT NULL,
	"data_inicio" date NOT NULL,
	"data_fim" date
);
--> statement-breakpoint
ALTER TABLE "analises_mensais" ADD CONSTRAINT "analises_mensais_usuario_id_user_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presenca" ADD CONSTRAINT "presenca_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_grupos" ADD CONSTRAINT "user_grupos_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_grupos" ADD CONSTRAINT "user_grupos_grupo_id_grupos_id_fk" FOREIGN KEY ("grupo_id") REFERENCES "public"."grupos"("id") ON DELETE no action ON UPDATE no action;