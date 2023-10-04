import { Prisma, Usuario } from '@prisma/client'
import { UserRepository } from '../../../application/repositories/user/user-repository'
import { User } from '../../../application/entites/users/user'

export class inMemoryUserRepository extends UserRepository {
  public itens: Usuario[] = []

  create(data: Prisma.UsuarioCreateInput): Promise<void> {
    const created = {
      id: 'user-1',
      nome: data.nome,
      matricula: data.matricula,
      password: data.password,
      permission: data.permission,
      created_at: new Date(),
    }

    this.itens.push(created)
    return created
  }

  findMany(): Promise<User> {
    throw new Error('Method not implemented.')
  }

  findUnique(matricula: number): Promise<User> {
    throw new Error('Method not implemented.')
  }

  authe(matricula: number): Promise<User> {
    throw new Error('Method not implemented.')
  }

  update(
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
