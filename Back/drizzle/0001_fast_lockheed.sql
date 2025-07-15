ALTER TABLE "media_roles" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."roles";--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('TODOS', 'ALMOXARIFADO', 'COMPRAS', 'SECRETARIA', 'FINANCEIRO', 'DP', 'TI', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'PJA', 'OUTROS');--> statement-breakpoint
ALTER TABLE "media_roles" ALTER COLUMN "role" SET DATA TYPE "public"."roles" USING "role"::"public"."roles";