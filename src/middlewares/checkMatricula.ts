import { UserRepository } from "../application/repositories/user/user-repository"

interface IMatricula {
  matricula: number
}

export class verifyMatricula {
    constructor(private userRepositorie: UserRepository) {
        Promise<void>
    }
  async verifyMatricula(request: IMatricula) {
    const { matricula } = request

    const check = await this.userRepositorie.
  }
}
