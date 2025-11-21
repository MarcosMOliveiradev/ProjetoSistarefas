ALTER TABLE "Atividade" ALTER COLUMN "tempo_medio" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "Atividade" ALTER COLUMN "tempo_medio" SET DEFAULT 60;--> statement-breakpoint
ALTER TABLE "Atividade" ADD COLUMN "ativado" boolean DEFAULT true NOT NULL;