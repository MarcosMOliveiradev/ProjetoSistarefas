import type { AnaliseMensalRepository } from "../../repositories/AnaliseMensalRepository.ts";

interface IAnaliseProps {
  mes: number,
  ano: number
}

export class FindAnaliseForPeriod {
  constructor (private repository: AnaliseMensalRepository) {}

  async execute({ ano, mes }: IAnaliseProps) {
    const analises = await this.repository.findAnaliseForPeriod(mes, ano)

    return analises
  }
}