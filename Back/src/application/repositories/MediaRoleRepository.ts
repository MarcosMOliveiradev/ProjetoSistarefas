import { Roles } from "../entities/roles";


export abstract class MediaRoleRepository {
    abstract create(role: Roles): Promise<void>;
}