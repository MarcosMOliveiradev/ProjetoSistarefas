import { eq } from "drizzle-orm";
import { User } from "../../application/entities/User.ts";
import { UserRepository } from "../../application/repositories/UserRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";
import type { userRoleDTO } from "../../DTOs/UserRoleDTO.ts";
import type { userDTO } from "../../DTOs/UserDTO.ts";

export class UserDrizzleRepository extends UserRepository {
    async updatePassword(password: string, id: string): Promise<void> {
        await db.update(schema.user).set({password: password}).where(eq(schema.user.id, id))
    }

    async create(data: User): Promise<userDTO> {
        const [createdUser] = await db.insert(schema.user).values(
        [{
            id: data.id,
            name: data.name,
            matricula: data.matricula,
            ativado: data.ativado,
            avatarUrl: data.avata,
            password: data.password,
            createdAt: data.createdAt
        }]).returning();

    return createdUser;
    }

    async findById(id: string): Promise<userRoleDTO | null> {
        const [user] = await db.select().from(schema.user).where(eq(schema.user.id, id)).innerJoin(schema.userRoles, eq(schema.user.id, schema.userRoles.userId))

        return user
    }

    async find(): Promise<userRoleDTO[]> {
        throw new Error("Method not implemented.");
    }
    async findByMatricula(matricula: number): Promise<userRoleDTO> {
        const [user] = await db.select().from(schema.user).where(eq(schema.user.matricula, matricula)).innerJoin(schema.userRoles, eq(schema.user.id, schema.userRoles.userId))

        return user
    }

}