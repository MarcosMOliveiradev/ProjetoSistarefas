import { Roles } from "../entities/Roles.ts";

export abstract class UserRoleRepository {
    abstract create(role: Roles): Promise<void>
}