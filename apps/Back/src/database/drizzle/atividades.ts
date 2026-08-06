import { boolean, doublePrecision, integer, pgTable, text,  } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { relations } from "drizzle-orm";
import { tarefas } from "./tarefas.ts";

export const atividade = pgTable("Atividade", {
    cod_atividade: integer("cod_atividade").primaryKey(),
    setor: text("setor").notNull(),
    descricao: text("descricao").notNull(),
    tempo_medio: doublePrecision("tempo_medio").notNull().default(60.0),
    ativado: boolean("ativado").notNull().default(true),

    usuarioId: text("usuario"). references(() => user.id)
})

export const atividadesRelations = relations(atividade, ({ one, many }) => {
    return {
        user: one(user, {
            fields: [atividade.usuarioId],
            references: [user.id],
            relationName: "atividadesUser"
        }),
        tarefas: many(tarefas, {
            relationName: "atividadesTarefas"
        })
    }
})