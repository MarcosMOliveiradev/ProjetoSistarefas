import { index, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { user } from "./user.ts";
import { RolesEnum } from "./roles.ts";


export const userRoles = pgTable("user_roles", {
    userId: text("user_id").references(() => user.id, {
        onDelete: "cascade",
    }).notNull(),

    role: RolesEnum("role").notNull(),
},
(t) => ({
    pk: primaryKey(t.userId, t.role),

    roleIdx: index("user_roles_role_idx").on(t.role)
})
)