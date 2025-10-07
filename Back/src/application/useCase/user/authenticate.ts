import type { UserRepository } from "../../repositories/UserRepository.ts";

import { UnexistUser } from "./error/unexistUser.ts";
import { IncorrectUserPassword } from "./error/incorrectUserPassword.ts";
import { compare, compareSync } from "bcryptjs";

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

    const comparePass = await compareSync(passwordBody, user.password)
    console.log(comparePass)

    // if(!comparePass) {
    //   throw new IncorrectUserPassword()
    // }

    console.log(user)

    return user

  }
}