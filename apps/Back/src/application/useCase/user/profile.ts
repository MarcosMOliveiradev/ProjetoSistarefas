import type { UserRepository } from "../../repositories/UserRepository.ts";

export interface IUserId {
  id: string
}

export class profile {
  constructor(private storage: UserRepository) {}

  async exec({ id }: IUserId) {
    const user = await this.storage.findById(id)

    return user
  }
}