import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts"

interface EncerrarVinculoRequest {
  userId: string
  dataFim: Date
}

export class EncerrarVinculoUsuarioGrupo {
  constructor(
    private userGrupoRepository: UserGrupoRepository
  ) {}

  async execute({ userId, dataFim }: EncerrarVinculoRequest) {
    const vinculoAtivo = await this.userGrupoRepository.findGrupoAtivo(
      userId,
      dataFim
    )

    if (!vinculoAtivo) {
      throw new Error("Usuário não possui vínculo ativo")
    }

    if (vinculoAtivo.dataFim) {
      throw new Error("Vínculo já encerrado")
    }

    await this.userGrupoRepository.encerrarVinculo(
      vinculoAtivo.id,
      dataFim
    )
  }
}