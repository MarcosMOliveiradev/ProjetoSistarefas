import { User } from '../../entites/users/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
}
