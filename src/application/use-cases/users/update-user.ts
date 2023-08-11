import { User } from '../../entites/users/user'
import { UserRepository } from '../../repositories/user/user-repository'

interface IUpdateUserRequest {
  _id: string
  nome: string
  matricula: number
  password: string
  permission: boolean
}

interface ICreateUserRespose {
  user: User
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async update(request: IUpdateUserRequest): Promise<ICreateUserRespose> {
    const { nome, matricula, password, permission, _id } = request

    const id = _id

    const user = new User({
      nome,
      matricula,
      permission,
      password,
    })

    await this.userRepository.update(user, id)

    return { user }
  }
}
