ALTER TABLE "kanban" ALTER COLUMN "criado_em" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "kanban" ALTER COLUMN "criado_em" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "kanban" ALTER COLUMN "iniciado_em" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "kanban" ALTER COLUMN "finalizado_em" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "kanban" ALTER COLUMN "cancelado_em" SET DATA TYPE date;