import { index, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { user } from "./user";


export const userRoles = pgTable("user_roles", {
    userId: text("user_id").references(() => user.id, {
        onDelete: "cascade",
    }).notNull(),

    role: text("role").notNull(),
},
(t) => ({
    pk: primaryKey(t.userId, t.role),

    roleIdx: index("user_roles_role_idx").on(t.role)
})
)