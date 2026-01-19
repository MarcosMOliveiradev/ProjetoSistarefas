import type { UserRepository } from "../../repositories/UserRepository.ts";

interface IUserUpdate {
  id: string
  name?: string;
  password?: string;
  ativado?: boolean;
}

export class UpdateUser {
  constructor (private userRepository: UserRepository) {}

  async execute({ id, name, password, ativado}: IUserUpdate) {
    const user = await this.userRepository.findById(id)
    if(!user) {
      throw new Error('Usuario não encontrado!')
    }
    await this.userRepository.updateUser({ id, ativado, name, password })
  }
}