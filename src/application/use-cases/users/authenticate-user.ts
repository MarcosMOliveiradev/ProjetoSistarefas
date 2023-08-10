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

    const getToken = await this.userRepository.findMany()

    console.log('authentication user use-cases', getToken)

    const token = app.jwt.sign(
      {
        nome: getToken.nome,
        matricula: getToken.matricula,
        permissao: getToken.permissao,
      },
      {
        sub: getToken.id,
        expiresIn: '30 days',
      },
    )

    console.log('authentication user use-cases', token)
    return { token }
  }
}
