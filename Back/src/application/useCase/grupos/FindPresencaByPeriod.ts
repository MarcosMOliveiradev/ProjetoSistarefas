import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface IFindPresencaByPeriod {
  userId: string
  inicio: Date
  fim: Date
}

export class FindPresencaByPeriod {
  constructor(private repository: PresencaRepository) {}

  async execute({ userId, inicio, fim }: IFindPresencaByPeriod) {
    const presencas = await this.repository.findByUserAndPeriod(userId, inicio, fim)

    return presencas
  }
}