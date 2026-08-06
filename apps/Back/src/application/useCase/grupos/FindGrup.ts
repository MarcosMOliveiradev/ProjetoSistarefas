import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";

export class FindGrup {
  constructor(private grupoRepository: GrupoRepository) {}

  execute(id: string) {
    return this.grupoRepository.findGrupById(id)
  }
}