import { hash } from "bcryptjs";
import type { UserRepository } from "../../repositories/UserRepository.ts";

interface IUserUpdate {
  id: string
  name?: string;
  senha?: string;
  ativado?: boolean;
}

export class UpdateUser {
  constructor (private userRepository: UserRepository) {}

  async execute({ id, name, senha, ativado}: IUserUpdate) {
    let password;
    if(senha) {
      password = await hash(senha, 6)
    } else {
      password = undefined
    }

    const user = await this.userRepository.findById(id)
    if(!user) {
      throw new Error('Usuario não encontrado!')
    }
    await this.userRepository.updateUser({ id, ativado, name, password })
  }
}