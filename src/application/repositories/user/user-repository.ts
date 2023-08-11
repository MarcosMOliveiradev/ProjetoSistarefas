import { User } from '../../entites/users/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract findMany(): Promise<User>
  abstract findUnique(matricula: number): Promise<User>
  abstract authe(matricula: number): Promise<User>
  abstract update(user: User, id: string): Promise<void>
  abstract matricula(verifyMatricula: number): Promise<void>
}
