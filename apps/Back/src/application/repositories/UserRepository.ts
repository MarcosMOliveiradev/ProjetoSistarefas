import type { userDTO } from "../../DTOs/UserDTO.ts";
import type { userRoleDTO, Users } from "../../DTOs/UserRoleDTO.ts";
import { turnoEnum } from "../entities/Roles.ts";
import { User } from "../entities/User.ts";

export interface IUpdateUser {
    id: string;
    name?: string;
    password?: string;
    ativado?: boolean;
}

export abstract class UserRepository {
    abstract create(user: User): Promise<userDTO>;
    abstract findById(id: string): Promise<userRoleDTO | null>;
    abstract find(): Promise<Users[]>;
    abstract findByMatricula(matricula: number): Promise<userRoleDTO>;
    abstract updatePassword(password: string, id: string): Promise<void>;
    abstract updateAvataUrl(avatarUrl: string, userId: string): Promise<void>;
    abstract updateTurno(userId: string, turno: turnoEnum): Promise<void>;
    abstract updateUser(dados: IUpdateUser): Promise<void>
}