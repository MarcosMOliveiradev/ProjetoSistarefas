import { Roles } from "../entities/Roles.ts"

export abstract class MediaRoleRepository {
    abstract create(role: Roles, mediaId: string): Promise<void>;
}