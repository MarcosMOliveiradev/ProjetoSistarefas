import { User } from '../../entites/users/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract findMany(): Promise<User>
  abstract authe(matricula: number): Promise<User>
  abstract matricula(verifyMatricula: number): Promise<void>
}
