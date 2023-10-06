import { Usuario } from '@prisma/client'
import { UserRepository } from '../../../application/repositories/user/user-repository'
import { User } from '../../../application/entites/users/user'

export class InMemoryUserRepository extends UserRepository {
  public itens: Usuario[] = []

  async create(data: User): Promise<void> {
    const created = {
      id: data.id,
      nome: data.nome,
      matricula: data.matricula,
      password: data.password,
      permission: data.permission,
      created_at: new Date(),
      update_at: new Date(),
    }

    this.itens.push(created)
    return created
  }

  async findMany(): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async findUnique(matricula: number): Promise<User> {
    const user = this.itens.find((item) => item.matricula === matricula)
    if (!user) {
      return null
    }

    return user
  }

  async authe(matricula: number): Promise<User> {
    const auth = await this.itens.find((item) => item.matricula === matricula)
    if (!auth) {
      return null
    }
    return auth
  }

  async update(
    nome: string | undefined,
    matricula: number | undefined,
    password: string | undefined,
    permission: boolean | undefined,
    id: string,
  ): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async matricula(verifyMatricula: number): Promise<User | null> {
    const user = this.itens.find((item) => item.matricula === verifyMatricula)

    if (!user) {
      return null
    }

    return user
  }
}
