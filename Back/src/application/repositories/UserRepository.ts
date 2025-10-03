import { User } from "../entities/User.ts";

export abstract class UserRepository {
    abstract create(user: User): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract find(): Promise<User[]>;
    abstract findByMatricula(matricula: number): Promise<User>;
}