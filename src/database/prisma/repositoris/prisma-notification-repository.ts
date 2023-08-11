import { prisma } from '../../prisma'
import { UserRepository } from '../../../application/repositories/user/user-repository'
import { User } from '../../../application/entites/users/user'

export class PrismaUserRepository extends UserRepository {
  async update(user: User, id: string): Promise<void> {
    await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        nome: user.nome,
        matricula: user.matricula,
        password: user.password,
        permission: user.permission,
      },
    })
  }

  async matricula(verifyMatricula: number): Promise<void> {
    const matricula = await prisma.usuario.findUnique({
      where: {
        matricula: verifyMatricula,
      },
    })

    if (matricula) {
      throw new Error('⚠ Usuario ja existente!')
    }
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
        id: user.id,
        nome: user.nome,
        matricula: user.matricula,
        password: user.password,
        permission: user.permission,
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

    return users
  }

  async findUnique(matricula: number): Promise<User> {
    const users = await prisma.usuario.findUnique({
      where: {
        matricula,
      },
      select: {
        nome: true,
        matricula: true,
        permission: true,
      },
    })

    return users
  }
}
