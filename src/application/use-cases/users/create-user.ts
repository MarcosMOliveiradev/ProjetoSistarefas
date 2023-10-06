// import { hash } from 'bcrypt'
import { hash } from 'bcrypt'

import { User } from '../../entites/users/user'
import { UserRepository } from '../../repositories/user/user-repository'

interface ICreateUserRequest {
  nome: string
  matricula: number
  password: string
  permission: boolean
}

interface ICreateUserRespose {
  user: User
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async execute(request: ICreateUserRequest): Promise<ICreateUserRespose> {
    const { nome, matricula, password, permission } = request

    const userWithSameMatricula = await this.userRepository.matricula(matricula)

    if (userWithSameMatricula) {
      throw new Error('Usuario ja existe')
    }

    const passwordHash = await hash(password, 6)

    const user = new User({
      nome,
      matricula,
      password: passwordHash,
      permission,
    })

    await this.userRepository.create(user)

    return {
      user,
    }
  }
}
