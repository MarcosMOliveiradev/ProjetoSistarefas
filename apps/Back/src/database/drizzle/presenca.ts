import { createId } from "@paralleldrive/cuid2";
import { date, pgTable, text, time, unique } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { origemPresencaEnum, statusPresencaEnum, tipoEsperadoEnum } from "./enums.ts";

export const presenca = pgTable("presenca", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),

  userId: text("user_id").references(() => user.id, {
    onDelete: "cascade",
  }).notNull(),

  data: date("data").notNull(),
  tipoEsperado: tipoEsperadoEnum("tipo_esperado").notNull(),
  status: statusPresencaEnum("status").notNull().default("PENDENTE"),
  horaEntrada: time("hora_entrada"),
  origem: origemPresencaEnum("origem").notNull()
}, (table) => ({
  unicoPorDia: unique().on(table.userId, table.data)
}))