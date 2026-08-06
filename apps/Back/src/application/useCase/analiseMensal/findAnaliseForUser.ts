import { statusPresencaEnum } from "../../entities/Roles.ts";
import type { AnaliseMensalRepository } from "../../repositories/AnaliseMensalRepository.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface IAnaliseProps {
  userId: string
}

export class findAnaliseForUser {
  constructor (
    private analiseRepository: AnaliseMensalRepository
  ) {}

  async execute({ userId }: IAnaliseProps) {
    const analise = await this.analiseRepository.findHistoricoUsuario(userId)
    
    return analise
  }
}