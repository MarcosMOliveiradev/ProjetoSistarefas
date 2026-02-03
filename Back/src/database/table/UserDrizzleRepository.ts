import { User } from "../../application/entities/User.ts";
import { UserRepository, type IUpdateUser } from "../../application/repositories/UserRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";
import type { userRoleDTO, Users } from "../../DTOs/UserRoleDTO.ts";
import type { userDTO } from "../../DTOs/UserDTO.ts";
import { eq } from "drizzle-orm";
import { turnoEnum } from "../../application/entities/Roles.ts";

export class UserDrizzleRepository extends UserRepository {
    async updateUser(dados: IUpdateUser): Promise<void> {
        await db.update(schema.user).set({
            name: dados.name,
            password: dados.password,
            ativado: dados.ativado,
            updatedAt: new Date()
        }).where(eq(schema.user.id, dados.id))
    }
    async updateTurno(userId: string, turno: turnoEnum): Promise<void> {
        await db.update(schema.user).set({turno, updatedAt: new Date}).where(eq(schema.user.id, userId))
    }
    async updateAvataUrl(avatarUrl: string, userId: string): Promise<void> {
        await db.update(schema.user)
            .set({avatarUrl: avatarUrl, updatedAt: new Date}).where(eq(schema.user.id, userId)).returning();
    }
    async updatePassword(password: string, id: string): Promise<void> {
        await db.update(schema.user).set({password: password, updatedAt: new Date}).where(eq(schema.user.id, id))
    }

    async create(data: User): Promise<userDTO> {
        const [createdUser] = await db.insert(schema.user).values(
        [{
            id: data.id,
            name: data.name,
            matricula: data.matricula,
            turno: data.turno,
            ativado: data.ativado,
            avatarUrl: data.avata,
            password: data.password,
            createdAt: data.createdAt
        }]).returning();

    return createdUser;
    }

    async findById(id: string): Promise<userRoleDTO | null> {
        const [user] = await db.select({
           user: {
                id: schema.user.id,
                name: schema.user.name,
                matricula: schema.user.matricula,
                turno: schema.user.turno,
                avatarUrl: schema.user.avatarUrl,
                ativado: schema.user.ativado,
                createdAt: schema.user.createdAt,
                updatedAt: schema.user.updatedAt,
            },
            user_roles: {
                role: schema.userRoles.role,
                userId: schema.userRoles.userId
            }
        }).from(schema.user).where(eq(schema.user.id, id)).innerJoin(schema.userRoles, eq(schema.user.id, schema.userRoles.userId))

        return user
    }

    async find(): Promise<Users[]> {
        const users = await db.select({
            id: schema.user.id,
            name: schema.user.name,
            matricula: schema.user.matricula,
            turno: schema.user.turno,
            ativado: schema.user.ativado,
            avatarUrl: schema.user.avatarUrl,
            role: schema.userRoles.role
        }).from(schema.user).innerJoin(schema.userRoles, eq(schema.user.id, schema.userRoles.userId))
        .where(eq(schema.user.ativado, true)).orderBy(schema.user.name);
        return users
    }

    async findByMatricula(matricula: number): Promise<userRoleDTO> {
        const [user] = await db.select({
            user: {
                id: schema.user.id,
                name: schema.user.name,
                matricula: schema.user.matricula,
                turno: schema.user.turno,
                password: schema.user.password,
                avatarUrl: schema.user.avatarUrl,
                ativado: schema.user.ativado,
                createdAt: schema.user.createdAt,
                updatedAt: schema.user.updatedAt,
            },
            user_roles: {
                role: schema.userRoles.role,
                userId: schema.userRoles.userId
            }
        }).from(schema.user)
            .innerJoin(schema.userRoles, eq(schema.user.id, schema.userRoles.userId))
            .where(eq(schema.user.matricula, matricula))
        return user
    }

}