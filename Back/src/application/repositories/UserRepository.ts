import type { userDTO } from "../../DTOs/UserDTO.ts";
import type { userRoleDTO } from "../../DTOs/UserRoleDTO.ts";
import { User } from "../entities/User.ts";

export abstract class UserRepository {
    abstract create(user: User): Promise<userDTO>;
    abstract findById(id: string): Promise<userRoleDTO | null>;
    abstract find(): Promise<userRoleDTO[]>;
    abstract findByMatricula(matricula: number): Promise<userRoleDTO>;
    abstract updatePassword(password: string, id: string): Promise<void>;
    abstract updateAvataUrl(avatarUrl: string, userId: string): Promise<void>;
}