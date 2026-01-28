import type { AnaliseMensalRepository } from "../../repositories/AnaliseMensalRepository.ts";

interface IDados {
  userId: string;
  mes: number;
  ano: number;
}

export class DadosForPDF{
  constructor (private analiseRepository: AnaliseMensalRepository) {}

  async execute({ userId, mes, ano }: IDados) {
    const analiseMensal = await this.analiseRepository.findByUserAndPeriod( userId, mes, ano )

    if (!analiseMensal) {
      throw new Error('Não existe análise mensal para este usuário e período.')
    }

    const analiseForPdf = await this.analiseRepository.findAnaliseComAtrasos(userId, mes, ano)

    return analiseForPdf
  }
}