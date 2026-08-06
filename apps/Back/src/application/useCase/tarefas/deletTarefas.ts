import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";

interface DeletTarefasRequest {
  id: string
  ativado: boolean
  userId: string
}

export class DeletTarefas {
  constructor(private repository: TarefasRepository) {}

  async execute({ ativado, id, userId }: DeletTarefasRequest) {
    await this.repository.deleteTarefa(id, ativado, userId);
  }
}