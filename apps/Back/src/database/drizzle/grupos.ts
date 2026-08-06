import { createId } from "@paralleldrive/cuid2";
import { date, integer, pgTable, text } from "drizzle-orm/pg-core";

export const grupos = pgTable("grupos", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  nome: text("nome").notNull(),

  diasEmpresa: integer("dias_empresa").array(),
  diasInstituicao: integer("dias_instituicao").array(),

  dataInicio: date("data_inicio").notNull(),
  dataFim: date("data_fim")
})