CREATE TABLE "user_grupo" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"grupo_id" text NOT NULL,
	"data_inicio" date NOT NULL,
	"data_fim" date
);
--> statement-breakpoint
DROP TABLE "user_grupos" CASCADE;--> statement-breakpoint
ALTER TABLE "user_grupo" ADD CONSTRAINT "user_grupo_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_grupo" ADD CONSTRAINT "user_grupo_grupo_id_grupos_id_fk" FOREIGN KEY ("grupo_id") REFERENCES "public"."grupos"("id") ON DELETE no action ON UPDATE no action;