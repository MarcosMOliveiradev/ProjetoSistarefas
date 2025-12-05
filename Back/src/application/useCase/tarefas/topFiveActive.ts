import type { TarefasRepository } from "../../repositories/TarefasRepository.ts"

interface TopFiveActiveProps {
  userId: string
}

export class TopFiveActive {
  constructor(private tarefasRepository: TarefasRepository) {}

  async  execute({ userId }: TopFiveActiveProps) {

    const topActive = await this.tarefasRepository.top5atividedes(userId)

    return topActive
  }
}