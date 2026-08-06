import type { KanbanRepository } from "../../repositories/kanbanRepository.ts"

export interface IKanbanStartProps {
  id: string,
  userId: string
}

export class KanbanFinish {
  constructor(private kanbanRepository: KanbanRepository) {}

  async execute({ id, userId }: IKanbanStartProps) {
    await this.kanbanRepository.finish(id, userId)
  }
}