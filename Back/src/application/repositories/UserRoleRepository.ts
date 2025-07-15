import { Roles } from "../entities/roles";

export abstract class UserRoleRepository {
    abstract create(role: Roles): Promise<void>
}