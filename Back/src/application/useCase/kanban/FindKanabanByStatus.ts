import type { kanbanStatusEnum } from "../../entities/Roles.ts"
import type { KanbanRepository } from "../../repositories/kanbanRepository.ts"

export interface IKanbanProps {
  status: kanbanStatusEnum
}

export class FindKanbanByStatus {
  constructor(
    private kanbanRepository: KanbanRepository,
  ) {}

  async execute({ status }: IKanbanProps) {
    const kanban = await this.kanbanRepository.findStatus(status)

    return kanban
  }
}