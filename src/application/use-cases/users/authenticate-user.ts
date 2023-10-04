import { compare } from 'bcrypt'
import { UserRepository } from '../../repositories/user/user-repository'
import { FastifyInstance } from 'fastify'
import { PasswordIncorrectError } from './errors/password-incorrect-error'

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

    // Verifica a matricula
    const verificaMatricula = await this.userRepository.verifyMatricula(
      matricula,
    )
    if (verificaMatricula == null) {
      throw new PasswordIncorrectError()
    }

    const getUser = await this.userRepository.findUnique(matricula)

    const authentication = await this.userRepository.authe(matricula)

    const passwordHas = await compare(password, authentication.password)

    // verifica a senha
    if (!passwordHas) {
      throw new PasswordIncorrectError()
    }

    const token = await app.jwt.sign(
      {
        nome: getUser.nome,
        matricula: getUser.matricula,
        permission: getUser.permission,
      },
      {
        sub: getUser.id,
        expiresIn: '1 days',
      },
    )
    return { token }
  }
}
