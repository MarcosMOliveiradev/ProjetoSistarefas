import { index, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { media } from "./media.ts";
import { RolesEnum } from "./roles.ts";


export const mediaRoles = pgTable("media_roles", {
    mediaId: text("media_id").references(() => media.id, {
        onDelete: "cascade",
    }).notNull(),

    role: RolesEnum("role").notNull(),
},
(t) => ({
    pk: primaryKey(t.mediaId, t.role),

    roleIdx: index("media_roles_role_idx").on(t.role)
})
);