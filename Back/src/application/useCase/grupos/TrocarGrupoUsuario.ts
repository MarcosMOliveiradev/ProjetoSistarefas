import { UserGrupos } from "../../entities/userGrupos.ts"
import type { GrupoRepository } from "../../repositories/GrupoRepository.ts"
import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts"

interface TrocarGrupoRequest {
  userId: string
  novoGrupoId: string
  dataInicio: Date
}

export class TrocarGrupoUsuario {
  constructor(
    private userGrupoRepository: UserGrupoRepository,
    private grupoRepository: GrupoRepository
  ) {}

  async execute({ userId, novoGrupoId, dataInicio }: TrocarGrupoRequest) {

    const grupo = await this.grupoRepository.findById(novoGrupoId)
    if (!grupo) {
      throw new Error("Grupo não encontrado")
    }

    const vinculoAtivo = await this.userGrupoRepository.findGrupoAtivo(
      userId,
      dataInicio
    )

    if (!vinculoAtivo) {
      throw new Error("Usuário não possui vínculo ativo")
    }

    await this.userGrupoRepository.encerrarVinculo(
      vinculoAtivo.id,
      dataInicio
    )

    const novoVinculo = new UserGrupos({
      userId,
      grupoId: novoGrupoId,
      dataInicio,
    })

    await this.userGrupoRepository.vincular(novoVinculo)
  }
}