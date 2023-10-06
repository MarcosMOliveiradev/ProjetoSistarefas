import { compare } from 'bcrypt'
import { UserRepository } from '../../repositories/user/user-repository'
import { PasswordIncorrectError } from './errors/password-incorrect-error'
import { User } from '../../entites/users/user'

interface IAuthentication {
  matricula: number
  password: string
}

interface ResponseUser {
  user: User
}

export class AuthenticateUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async auth(request: IAuthentication): Promise<ResponseUser> {
    const { matricula, password } = request

    // Verifica a matricula
    const verificaMatricula = await this.userRepository.matricula(matricula)

    if (!verificaMatricula) {
      throw new PasswordIncorrectError()
    }

    const user = await this.userRepository.findUnique(matricula)

    const authentication = await this.userRepository.authe(matricula)

    const passwordHas = await compare(password, authentication.password)

    // verifica a senha
    if (!passwordHas) {
      throw new PasswordIncorrectError()
    }

    return {
      user,
    }
  }
}
