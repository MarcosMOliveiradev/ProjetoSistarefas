import type { KanbanRepository } from "../../repositories/kanbanRepository.ts";

export interface IKanbanProps {
  id: string
}

export class FindKanbanById {
  constructor(
    private kanbanRepository: KanbanRepository,
  ) {}

  async execute({ id }: IKanbanProps) {
    const kanban = await this.kanbanRepository.findById(id)

    return kanban
  }
}