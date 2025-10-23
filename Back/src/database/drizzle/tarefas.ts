import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { atividade } from "./atividades.ts";

export const tarefas = pgTable("tarefas", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    data: text("data").notNull(),
    item: integer("item").notNull(),
    cod_atividade: integer("cod_atividade").references(() => atividade.cod_atividade),
    qtd_folha: integer("qtd_folha").notNull(),
    h_inicio: integer("h_inicio").notNull(),
    h_termino: integer("h_termino").notNull(),
    n_atendimento: integer("n_atendimento").notNull(),
    ativado: boolean("ativado").notNull().default(true),

    usuarioId: text("usuario").references(() => user.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").notNull().defaultNow()
})

export const tarefasRelations = relations(tarefas, ({ one }) => {
    return {
        user: one(user, {
            fields: [tarefas.usuarioId],
            references: [user.id],
            relationName: "tarefasUser"
        }),
        atividade: one(atividade, {
            fields: [tarefas.cod_atividade],
            references: [atividade.cod_atividade],
            relationName: "atividadesTarefas"
        })
    }
})