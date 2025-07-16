import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { media } from "./media.ts";

export const user = pgTable("user", {
    id: text("id").$defaultFn(() => createId()).primaryKey(),
    name: text("name").notNull(),
    matricula: numeric("matricula").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const userRelations = relations(user, ({ many}) => {
    return {
        media: many(media, {
            relationName: 'mediaUser',
        })
    }
})