import { prisma } from '../../prisma'
import { UserRepository } from '../../../application/repositories/user/user-repository'
import { User } from '../../../application/entites/users/user'

export class PrismaUserRepository extends UserRepository {
  async matricula(matricula: number): Promise<void> {
    const matricula = await prisma.usuario.findUnique()
  }

  async authe(matricula: number): Promise<User> {
    const auth = await prisma.usuario.findFirst({
      where: {
        matricula,
      },
      select: {
        password: true,
      },
    })

    return auth
  }

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
