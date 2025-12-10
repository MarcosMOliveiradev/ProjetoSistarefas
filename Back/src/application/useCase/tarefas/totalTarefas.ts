import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";

export class TotalTarefas {
  constructor (private tarefasRepository: TarefasRepository) {}

  async execute() {
    const total = await this.tarefasRepository.totalTarefas()

    return total
  }
}