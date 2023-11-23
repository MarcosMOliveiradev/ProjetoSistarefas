import { hash } from 'bcrypt'
import { UserRepository } from '../../repositories/user/user-repository'

interface IUpdateUserRequest {
  _id: string
  nome?: string
  matricula?: number
  password?: string
  permission?: boolean
  userAvata?: string
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) {
    Promise<void>
  }

  async update(request: IUpdateUserRequest): Promise<void> {
    const { nome, matricula, password, permission, _id, userAvata } = request

    const id = _id

    if (password !== undefined) {
      const passwordHash = await hash(password, 6)

      await this.userRepository.update(
        nome,
        matricula,
        passwordHash,
        permission,
        id,
        userAvata,
      )
    } else {
      await this.userRepository.update(
        nome,
        matricula,
        password,
        permission,
        id,
        userAvata,
      )
    }
  }
}
