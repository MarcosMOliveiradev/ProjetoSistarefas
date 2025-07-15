import { User } from "../entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<User>;
    abstract findById(id: string): Promise<User | null>;
    abstract find(): Promise<User[]>;
}