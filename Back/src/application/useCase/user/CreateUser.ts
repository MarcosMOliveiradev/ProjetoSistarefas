import type { Roles } from "../../entities/Roles.ts";
import { User } from "../../entities/User.ts";
import type { UserRepository } from "../../repositories/UserRepository.ts";
import type { UserRoleRepository } from "../../repositories/UserRoleRepository.ts";

export interface UserI {
  name: string
  matricula: number
  password: string
  avatarUrl: string

  role: Roles
}

export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async exec( data: UserI ) {
    const { name, avatarUrl, matricula, password, role } = data

    const createUser = new User({
      name,
      matricula,
      password,
      ativado: true,
      avatarUrl
    })

    const user = await this.userRepository.create(createUser)

    await this.userRoleRepository.create(
      role,
      user.id
    )

    return {
      user
    }
  }
}