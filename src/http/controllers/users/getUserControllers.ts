import { FastifyRequest } from 'fastify'
import { authenticate } from '../../../middlewares/UserAuthenticate'
import { UserRepository } from '../../../application/repositories/user/user-repository'

export class GetUserController {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async getUser(request: FastifyRequest) {
    authenticate(request.user.permissao) // verifica se é adm

    const users = this.userRepository.findMany()

    return users
  }
}
