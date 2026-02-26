import type { KanbanRepository } from "../../repositories/kanbanRepository.ts"

export interface IKanbanStartProps {
  id: string,
  userId: string,
  motivo?: string | null
}

export class KanbanCancel {
  constructor(private kanbanRepository: KanbanRepository) {}

  async execute({ id, userId, motivo }: IKanbanStartProps) {
    await this.kanbanRepository.cancel(id, userId, motivo)
  }
}