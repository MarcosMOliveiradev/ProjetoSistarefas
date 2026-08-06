
import { hash } from "bcryptjs";
import type { UserRepository } from "../../repositories/UserRepository.ts";
import { UnexistUser } from "./error/unexistUser.ts";

export interface UpdatePasswordRequest {
  senha: string;
  id: string;
}

export class UpdatePassword {
  constructor( private storage: UserRepository) {}

  async execute({ senha, id }: UpdatePasswordRequest) {
    const password = await hash(senha, 6)
    const user = await this.storage.findById(id)

    if(!user) {
      throw new UnexistUser();
    }
    
    await this.storage.updatePassword(password, id);

  }
}