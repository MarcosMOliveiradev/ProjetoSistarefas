import type { KanbanRepository } from "../../repositories/kanbanRepository.ts";

export class DeleteKanban{
  constructor ( private kanbanRepository: KanbanRepository) {}

  async execute(id: string) {
    await this.kanbanRepository.delete(id)
  }
}