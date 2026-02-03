ALTER TABLE "analises_mensais" RENAME COLUMN "dias_esperados" TO "dias_esperados_empresa";--> statement-breakpoint
ALTER TABLE "analises_mensais" RENAME COLUMN "dias_cumpridos" TO "dias_esperados_instituicao";--> statement-breakpoint
ALTER TABLE "analises_mensais" ADD COLUMN "dias_cumpridos_empresa" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "analises_mensais" ADD COLUMN "dias_cumpridos_instituicao" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "analises_mensais" ADD COLUMN "atrasos" integer DEFAULT 0 NOT NULL;