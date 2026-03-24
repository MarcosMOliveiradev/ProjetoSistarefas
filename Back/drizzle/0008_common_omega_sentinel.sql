ALTER TABLE "user_grupos" DROP CONSTRAINT "user_grupos_grupo_id_grupos_id_fk";
--> statement-breakpoint
ALTER TABLE "user_grupos" ADD CONSTRAINT "user_grupos_grupo_id_grupos_id_fk" FOREIGN KEY ("grupo_id") REFERENCES "public"."grupos"("id") ON DELETE cascade ON UPDATE no action;