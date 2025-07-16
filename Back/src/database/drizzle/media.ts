import { pgTable, timestamp, text, pgEnum } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm';
import { user } from './user.ts';

// Categoria ou setor a qual o arquivo pertence
export const categoryEnum = pgEnum("category_enum", [
  "COMPRAS",
  "ALMOXARIFADO",
  "SECRETARIA",
  "FINANCEIRO",
  "DP",
  "INFORMATICA",
  "PONTO",
  "SEMAC",
  "SEMAL",
  "PCM",
  "PJA",
  "OUTROS",
]);

export const media = pgTable("media", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    costumerId: text("customer_id").references(() => user.id, {
        onDelete: "cascade",
    }).notNull(),
    category: categoryEnum("category").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const mediaRelations = relations(media, ({ one }) => {
    return {
        user: one(user, {
            fields: [media.costumerId],
            references: [user.id],
            relationName: 'mediaUser',
        })
    }
})