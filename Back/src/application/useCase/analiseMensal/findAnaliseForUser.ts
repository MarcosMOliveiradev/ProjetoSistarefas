import { statusPresencaEnum } from "../../entities/Roles.ts";
import type { AnaliseMensalRepository } from "../../repositories/AnaliseMensalRepository.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface IAnaliseProps {
  userId: string,
  mes: number,
  ano: number
}

export class findAnaliseForUser {
  constructor (
    private analiseRepository: AnaliseMensalRepository,
    private presencaRepository: PresencaRepository
  ) {}

  async execute({ userId, mes, ano }: IAnaliseProps) {
    const presenca = await this.presencaRepository.findResumoMesal(userId, mes, ano)

    let falta = 0;
    presenca.map((p) => {
      if(p.status === statusPresencaEnum.FALTA) {
        falta++
      }
    })
    const analise = await this.analiseRepository.findHistoricoUsuario(userId)

    return {analise, falta}
  }
}