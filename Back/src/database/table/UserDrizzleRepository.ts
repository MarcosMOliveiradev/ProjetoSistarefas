import { eq } from "drizzle-orm";
import { User } from "../../application/entities/User.ts";
import { UserRepository } from "../../application/repositories/UserRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class UserDrizzleRepository extends UserRepository {

    async create(data: User): Promise<User> {
        const [createdUser] = await db.insert(schema.user).values(
        {
            id: data.id,
            name: data.name,
            matricula: data.matricula,
            ativado: data.ativado,
            avatarUrl: data.avata,
            password: data.password,
            createdAt: data.createdAt
        }).returning();

    return createdUser;
    }

    async findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async find(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findByMatricula(matricula: number): Promise<User> {
        const [user] = await db.select().from(schema.user).where(eq(schema.user.matricula, matricula))

        return user
    }

}