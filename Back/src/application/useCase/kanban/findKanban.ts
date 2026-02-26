import type { KanbanRepository } from "../../repositories/kanbanRepository.ts";

export class findKanban {
  constructor(
    private kanbanRepository: KanbanRepository,
  ) {}

  async execute() {
    const kanban = await this.kanbanRepository.find()

    return kanban
  }
}