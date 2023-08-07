import { User } from '../../entites/users/user'
import { UserRepository } from '../../repositories/user/user-repository'

interface ICreateUserRequest {
  nome: string
  matricula: number
  password: string
  permissao: boolean
}

interface ICreateUserRespose {
  user: User
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: ICreateUserRequest): Promise<ICreateUserRespose> {
    const { nome, matricula, password, permissao } = request

    const user = new User({
      nome,
      matricula,
      password,
      permissao,
    })

    await this.userRepository.create(user)

    return {
      user,
    }
  }
}
