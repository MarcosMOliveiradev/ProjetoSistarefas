import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { media } from "./media.ts";
import { tarefas } from "./tarefas.ts";
import { atividade } from "./atividades.ts";
import { turnoEnum } from "./enums.ts";

export const user = pgTable("user", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    name: text("name").notNull(),
    matricula: integer("matricula").notNull().unique(),
    password: text("password").notNull(),
    avatarUrl: text("avatar_url"),
    turno: turnoEnum("turno"),
    ativado: boolean("ativado").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const userRelations = relations(user, ({ many}) => {
    return {
        media: many(media, {
            relationName: 'mediaUser',
        }),
        tarefas: many(tarefas, {
            relationName: 'tarefasUser',
        }),
        atividade: many(atividade, {
            relationName: 'atividadesUser',
        })
    }
})