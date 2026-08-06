import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";

interface ListTarefasByIntervalRequest {
  userId: string
  startDate: string
  endDate: string
}

export class ListTarefasByInterval {
  constructor(private tarefasRepository: TarefasRepository) {}

  async execute({ userId, endDate, startDate }: ListTarefasByIntervalRequest) {

    const tarefas = await this.tarefasRepository.listTarefasByDateInterval(startDate, endDate, userId)
    
    return tarefas
  }
}