import { User } from "../../application/entities/User.ts";
import { UserRepository } from "../../application/repositories/UserRepository.ts";
import { db } from "../connection.ts";
import {  user } from "../drizzle/user.ts";

export class UserDrizzleRepository extends UserRepository {
    async create(data: User): Promise<User> {
        const [createdUser] = await db.insert(user).values(
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

}