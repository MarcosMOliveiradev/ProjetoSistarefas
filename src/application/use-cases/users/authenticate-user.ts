import { compare } from 'bcrypt'
import { UserRepository } from '../../repositories/user/user-repository'
import { FastifyInstance } from 'fastify'

interface IAuthentication {
  matricula: number
  password: string
}

interface ResponseUser {
  token: string
}

export class AuthenticateUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async auth(
    request: IAuthentication,
    app: FastifyInstance,
  ): Promise<ResponseUser> {
    const { matricula, password } = request

    const authentication = await this.userRepository.authe(matricula)

    const passwordHas = compare(password, authentication.password)

    if (!passwordHas) {
      throw new Error('error')
    }

    const getUser = await this.userRepository.findUnique(matricula)

    const token = await app.jwt.sign(
      {
        nome: getUser.nome,
        matricula: getUser.matricula,
        permission: getUser.permission,
      },
      {
        sub: getUser.id,
        expiresIn: '30 days',
      },
    )
    return { token }
  }
}
