import { prisma } from '../../prisma'
import { UserRepository } from '../../../application/repositories/user/user-repository'
import { User } from '../../../application/entites/users/user'

export class PrismaUserRepository extends UserRepository {
  async update(
    nome: string | undefined,
    matricula: number | undefined,
    password: string | undefined,
    permission: boolean | undefined,
    id: string,
  ): Promise<void> {
    await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        nome,
        matricula,
        password,
        permission,
      },
    })
  }

  async matricula(verifyMatricula: number): Promise<User | null> {
    const user = await prisma.usuario.findUnique({
      where: {
        matricula: verifyMatricula,
      },
    })

    return user
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
        created_at: user.created,
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
        id: true,
        nome: true,
        matricula: true,
        permission: true,
      },
    })

    return users
  }
}
