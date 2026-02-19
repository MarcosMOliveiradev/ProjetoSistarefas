import { createId } from "@paralleldrive/cuid2";
import { date, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { atividade } from "./atividades.ts";
import { user } from "./user.ts";

export const kanbanStatusEnum = pgEnum("kanbanStatusEnum", [
  "TODO",
  "IN_PROGRESS",
  "DONE",
  "CANCELED"
])

export const kanban = pgTable("kanban", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),

  titulo: text("titulo").notNull(),
  codAtividades: integer("cod_atividade").references(() => atividade.cod_atividade),
  descricao: text("descricao").notNull(),

  status: kanbanStatusEnum("status").notNull().default("TODO"),

  criadoPor: text("criado_por").notNull().references(() => user.id),
  criadoEm: date("criado_em").notNull().defaultNow(),

  iniciadoPor: text("iniciado_por").references(() => user.id),
  iniciadoEm: date("iniciado_em"),

  finalizadoPor: text("finalizado_por").references(() => user.id),
  finalizadoEm: date("finalizado_em"),

  // Recomendo MUITO se você vai ter cancelamento:
  canceladoPor: text("cancelado_por").references(() => user.id),
  canceladoEm: date("cancelado_em"),
  motivoCancelamento: text("motivo_cancelamento"),
})