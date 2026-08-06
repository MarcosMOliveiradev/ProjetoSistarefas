import { UserGrupos } from "../../entities/userGrupos.ts";
import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts";

interface IUserForGrup {
  grupoId: string;
  userId: string;
  dataInicio: Date
  dataFim?: Date | null
}

export class UserForGrup {
  constructor(private repository: UserGrupoRepository) {}

  async execute({ userId, dataInicio, grupoId, dataFim }: IUserForGrup) {
    const vinculoAtivo = await this.repository.findGrupoAtivo(userId, dataInicio)

    if (vinculoAtivo && !vinculoAtivo.dataFim) {
      throw new Error("Usuário já tem vínculo ativo!")
    }

    if (dataFim && dataFim < dataInicio) {
      throw new Error("Data fim não pode ser menor que a data de início")
    }

    const vinculo = new UserGrupos({
      userId,
      grupoId,
      dataInicio,
      dataFim
    })

    await this.repository.vincular(vinculo)
  }
}