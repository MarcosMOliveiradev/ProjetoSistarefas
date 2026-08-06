import { createId } from "@paralleldrive/cuid2";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const statusOption = pgEnum("status_option", ['ANALIZANDO', 'EM ANDAMENTO', 'CONCLUIDO', 'CANCELADO'])

export const feedback = pgTable("feedback", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  conteudo: text("conteudo").notNull(),
  status: statusOption("status").default('ANALIZANDO'),
  nome: text("nome"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})