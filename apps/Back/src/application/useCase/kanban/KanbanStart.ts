import type { KanbanRepository } from "../../repositories/kanbanRepository.ts";

export interface IKanbanStartProps {
  id: string,
  userId: string
}

export class KanbanStart {
  constructor(private kanbanRepository: KanbanRepository) {}

  async execute({ id, userId }: IKanbanStartProps) {
    await this.kanbanRepository.start(id, userId)
  }
}