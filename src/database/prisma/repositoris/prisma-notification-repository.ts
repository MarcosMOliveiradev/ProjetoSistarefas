import { prisma } from '../../prisma'
import { UserRepository } from '../../../application/repositories/user/user-repository'
import { User } from '../../../application/entites/users/user'

export class PrismaUserRepository extends UserRepository {
  async create(user: User): Promise<void> {
    await prisma.usuario.create({
      data: {
        nome: user.nome,
        matricula: user.matricula,
        password: user.password,
        permission: user.permissao,
      },
    })
  }

  async findMany(): Promise<User> {
    const users = await prisma.usuario.findMany({
      select: {
        nome: true,
        matricula: true,
        permission: true,
      },
    })

    return { users }
  }
}
