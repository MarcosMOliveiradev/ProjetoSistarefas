import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";

export class FindGrupo {
  constructor(private repository: GrupoRepository) {}

  async execut() {
    const grupos = await this.repository.find()

    return grupos
  }
}