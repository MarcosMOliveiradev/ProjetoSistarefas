import { User } from "../../application/entities/user";
import { UserRepository } from "../../application/repositories/userRepository";
import { db } from "../connection";
import { user } from "../drizzle";


export class UserDrizzleRepository extends UserRepository {
    async create(data: User): Promise<User> {
        const [createdUser] = await db.insert(user).values(
        {
            id: data.id,
            name: data.name,
            matricula: data.matricula,
            email: data.email,
            password: data.password,
            createdAt: data.createdAt
        }).returning();

    return createdUser
    }
    async findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async find(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}