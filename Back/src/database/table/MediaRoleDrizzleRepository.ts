import { Roles } from "../../application/entities/Roles.ts";
import { MediaRoleRepository } from "../../application/repositories/MediaRoleRepository.ts";
import { db } from "../connection.ts";
import { mediaRoles } from "../drizzle/media_roles.ts";

export class MediaRoleDrizzleRepository extends MediaRoleRepository {
    async create(role: Roles, mediaId: string): Promise<void> {
        await db.insert(mediaRoles).values({
            mediaId: mediaId,
            role: role
        })
    }
}