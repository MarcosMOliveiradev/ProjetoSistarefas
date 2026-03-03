import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";
interface IGrupoProps {
  id: string
}
export class DeleteGrupo {
  constructor (private grupoRepository: GrupoRepository) {}

  async execute({ id }: IGrupoProps) {
    await this.grupoRepository.delete(id)
  }
}