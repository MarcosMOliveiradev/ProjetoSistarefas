import { hash } from "bcryptjs";

import type { Roles } from "../../entities/Roles.ts";
import { User } from "../../entities/User.ts";
import type { UserRepository } from "../../repositories/UserRepository.ts";
import type { UserRoleRepository } from "../../repositories/UserRoleRepository.ts";
import { UserAlreadyExistError } from "./error/userAlreadyExistsError.ts";

export interface UserI {
  name: string
  matricula: number
  passwordBody: string
  avatarUrl: string | null | undefined

  role: Roles
}

export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  async exec( data: UserI ) {
    const { name, avatarUrl, matricula, passwordBody, role } = data

    // Verifica se o usuario ja existe
    const userAlreadyExist = await this.userRepository.findByMatricula(matricula)
    if(userAlreadyExist) {
      throw new UserAlreadyExistError()
    }

    const password = await hash(passwordBody, 6)

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