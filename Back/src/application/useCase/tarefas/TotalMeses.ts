import type { TarefasRepository } from "../../repositories/TarefasRepository.ts"

interface TotalMesesProps {
  userId: string
}

export class TotalMeses {
  constructor(private tarefasRepository: TarefasRepository) {}

  async  execute({ userId }: TotalMesesProps) {

    const totalMeses = await this.tarefasRepository.qtdMeses(userId)

    return totalMeses
  }
}