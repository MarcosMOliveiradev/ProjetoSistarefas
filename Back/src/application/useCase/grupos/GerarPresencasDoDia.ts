import { origemPresencaEnum } from "../../entities/Roles.ts";
import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts";
import type { CreatePresenca } from "./CreatePresenca.ts";

export class GerarPresencasDoDia {
  constructor(
    private createPresenca: CreatePresenca,
    private userGrupoRepository: UserGrupoRepository
  ) {}
  
  async execute(data: Date) {
    const vinculoAtivo = await this.userGrupoRepository.findAtivosPorData(data)

    for(const vinculo of vinculoAtivo) {
      try {
        await this.createPresenca.execute({
          userId: vinculo.userId,
          data,
          origem: origemPresencaEnum.SISTEMA
        })
      } catch (err) {
        console.warn(
          `Presença não criada para user ${vinculo.userId}:`,
          err instanceof Error ? err.message : err
        )
      }
    }
  }
}