// import { hash } from 'bcrypt'
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

    await this.userRepository.matricula(matricula)

    // const passwordHash = await hash(password, 6)

    const user = new User({
      nome,
      matricula,
      password,
      permission,
    })

    await this.userRepository.create(user)

    return {
      user,
    }
  }
}
