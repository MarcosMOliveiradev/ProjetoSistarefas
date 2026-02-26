import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { kanban } from "./kanbanAtividades.ts";
import { user } from "./user.ts";

export const kanbanColaboradores = pgTable("kanban_colaboradores", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),

  kanbanId: text("kanban_id").notNull().references(() => kanban.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  adicionandoEm: timestamp("adicionado_em", { withTimezone: true }).defaultNow()
},
 (t) => ({
  uniq: unique("uniq_kanban_colab").on(t.kanbanId, t.userId)
 }) 
)