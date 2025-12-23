import { createId } from "@paralleldrive/cuid2";
import { date, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { grupos } from "./grupos.ts";

export const userGrupos = pgTable("user_grupos", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),

  userId: text("user_id").references(() => user.id, {
    onDelete: "cascade",
  }).notNull(),

  grupoId: text("grupo_id").references(() => grupos.id).notNull(),

  dataInicio: date("data_inicio").notNull(),
  dataFim: date("data_fim"),
})