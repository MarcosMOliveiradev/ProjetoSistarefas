ALTER TABLE "analises_mensais" ADD COLUMN "percentual_empresa" numeric(5, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "analises_mensais" ADD COLUMN "percentual_intituicao" numeric(5, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "analises_mensais" DROP COLUMN "percentual";