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
    const users = this.itens.find((item) => item.matricula === matricula)
    if (!users) {
      return null
    }

    return users
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

  matricula(verifyMatricula: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async verifyMatricula(verifyMatricula: number): Promise<boolean> {
    const verificaMatricula = await this.itens.find(
      (item) => item.matricula === verifyMatricula,
    )

    if (!verificaMatricula) {
      return null
    }
    return verificaMatricula
  }
}
