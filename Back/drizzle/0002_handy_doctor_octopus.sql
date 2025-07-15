ALTER TABLE "media" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category_enum";--> statement-breakpoint
CREATE TYPE "public"."category_enum" AS ENUM('COMPRAS', 'ALMOXARIFADO', 'SECRETARIA', 'FINANCEIRO', 'DP', 'TI', 'PONTO', 'SEMAC', 'SEMAL', 'PCM', 'OUTROS');--> statement-breakpoint
ALTER TABLE "media" ALTER COLUMN "category" SET DATA TYPE "public"."category_enum" USING "category"::"public"."category_enum";