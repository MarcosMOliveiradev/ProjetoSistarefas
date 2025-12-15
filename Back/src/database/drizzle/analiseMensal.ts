import { createId } from "@paralleldrive/cuid2";
import { integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { seloEnum } from "./enums.ts";

export const analisesMensais = pgTable("analises_mensais", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),

  usuarioId: text("usuario_id")
    .references(() => user.id)
    .notNull(),

  mes: integer("mes").notNull(), // 1-12
  ano: integer("ano").notNull(),

  diasEsperados: integer("dias_esperados").notNull(),
  diasCumpridos: integer("dias_cumpridos").notNull(),
  percentual: numeric("percentual", { precision: 5, scale: 2 }).notNull(),

  selo: seloEnum("selo").notNull(),

  pdfPath: text("pdf_path").notNull(),
  geradoEm: timestamp("gerado_em").defaultNow(),
});