import { createId } from "@paralleldrive/cuid2";
import { integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { seloEnum } from "./enums.ts";

export const analisesMensais = pgTable("analises_mensais", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),

  usuarioId: text("usuario_id")
    .references(() => user.id)
    .notNull(),

  mes: integer("mes").notNull(),
  ano: integer("ano").notNull(),

  diasEsperadosEmpresa: integer("dias_esperados_empresa").notNull(),
  diasEsperadosInstituicao: integer("dias_esperados_instituicao").notNull(),

  diasCumpridosEmpresa: integer("dias_cumpridos_empresa").notNull(),
  diasCumpridosInstituicao: integer("dias_cumpridos_instituicao").notNull(),

  atrasos: integer("atrasos").notNull().default(0),

  percentualEmpresa: numeric("percentual_empresa", { precision: 5, scale: 2 }).notNull(),
  percentualIntituicao: numeric("percentual_intituicao", { precision: 5, scale: 2 }).notNull(),

  selo: seloEnum("selo").notNull(),

  geradoEm: timestamp("gerado_em").defaultNow(),
})