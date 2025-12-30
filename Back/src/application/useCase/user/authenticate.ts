import type { UserRepository } from "../../repositories/UserRepository.ts";

import { UnexistUser } from "./error/unexistUser.ts";
import { IncorrectUserPassword } from "./error/incorrectUserPassword.ts";
import { compare } from "bcryptjs";

interface IUser {
  matricula: number,
  passwordBody: string
}

export class Authenticate {
  constructor(
    private userRepository:UserRepository
  ) {}

  async expec({ matricula, passwordBody }: IUser) {
    const user = await this.userRepository.findByMatricula(matricula)

    if(!user) {
      throw new UnexistUser()
    }
    

    const hash = user.user.password

    const comparePass = await compare(passwordBody, hash)

    if(!comparePass) {
      throw new IncorrectUserPassword()
    }

    return user

  }
}