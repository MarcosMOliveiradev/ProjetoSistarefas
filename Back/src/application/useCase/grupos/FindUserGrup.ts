import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";
import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts";

export class FindUserGrup {
  constructor (
    private userGrupRepository: UserGrupoRepository,
    private grupoRepository: GrupoRepository
  ) {}

  async execute(id: string) {
    const userGrupo = await this.userGrupRepository.findGrupoAtivoDoUsuario(id)

    if(!userGrupo) {
      throw new Error('Nenhum vinculo encontrado')
    }

    const grupo = await this.grupoRepository.findById(userGrupo.grupoId)
    if(!grupo) {
      throw new Error('Nenhum grupo encontrado')
    }

    return grupo
  }
}