import { FastifyRequest } from 'fastify'
// import { prisma } from '../../../database/prisma'
import { authenticate } from '../../../middlewares/UserAuthenticate'
import { UserRepository } from '../../../application/repositories/user/user-repository'

export class GetUserController {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async getUser(request: FastifyRequest) {
    authenticate(request.user.permission) // verifica se é adm

    const users = this.userRepository.findMany()

    return users
  }
}
