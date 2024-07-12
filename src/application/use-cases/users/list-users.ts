import { UserRepository } from 'src/application/repositories/user/user-repository'

export class ListUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async execute() {
    try {
      const user = this.userRepository.findMany()

      return user
    } catch (error) {
      throw new Error('erro do sistema')
    }
  }
}
