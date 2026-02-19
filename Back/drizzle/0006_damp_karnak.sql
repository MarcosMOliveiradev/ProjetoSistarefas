CREATE TYPE "public"."kanbanStatusEnum" AS ENUM('TODO', 'IN_PROGRESS', 'DONE', 'CANCELED');--> statement-breakpoint
CREATE TABLE "kanban" (
	"id" text PRIMARY KEY NOT NULL,
	"titulo" text NOT NULL,
	"cod_atividade" integer,
	"descricao" text NOT NULL,
	"status" "kanbanStatusEnum" DEFAULT 'TODO' NOT NULL,
	"criado_por" text NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	"iniciado_por" text,
	"iniciado_em" timestamp with time zone,
	"finalizado_por" text,
	"finalizado_em" timestamp with time zone,
	"cancelado_por" text,
	"cancelado_em" timestamp with time zone,
	"motivo_cancelamento" text
);
--> statement-breakpoint
CREATE TABLE "kanban_colaboradores" (
	"id" text PRIMARY KEY NOT NULL,
	"kanban_id" text NOT NULL,
	"user_id" text NOT NULL,
	"adicionado_em" timestamp with time zone DEFAULT now(),
	CONSTRAINT "uniq_kanban_colab" UNIQUE("kanban_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "kanban" ADD CONSTRAINT "kanban_cod_atividade_Atividade_cod_atividade_fk" FOREIGN KEY ("cod_atividade") REFERENCES "public"."Atividade"("cod_atividade") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban" ADD CONSTRAINT "kanban_criado_por_user_id_fk" FOREIGN KEY ("criado_por") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban" ADD CONSTRAINT "kanban_iniciado_por_user_id_fk" FOREIGN KEY ("iniciado_por") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban" ADD CONSTRAINT "kanban_finalizado_por_user_id_fk" FOREIGN KEY ("finalizado_por") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban" ADD CONSTRAINT "kanban_cancelado_por_user_id_fk" FOREIGN KEY ("cancelado_por") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban_colaboradores" ADD CONSTRAINT "kanban_colaboradores_kanban_id_kanban_id_fk" FOREIGN KEY ("kanban_id") REFERENCES "public"."kanban"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kanban_colaboradores" ADD CONSTRAINT "kanban_colaboradores_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;