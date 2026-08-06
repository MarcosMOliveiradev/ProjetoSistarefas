import type { UserRepository } from "../../repositories/UserRepository.ts";

export class FindUser {
  constructor (private userRepository: UserRepository) {}

  async execute() {
    const user = await this.userRepository.find();

    return user;
  }
}