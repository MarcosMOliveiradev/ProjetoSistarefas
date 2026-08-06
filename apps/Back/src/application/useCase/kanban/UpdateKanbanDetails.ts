import type { KanbanRepository } from "../../repositories/kanbanRepository.ts"

export interface IKanbanProps {
  id: string,
  titulo?: string,
  descricao?: string,
  codAtividades?: number,
}

export class UpdateKanbanDetails {
  constructor(
    private kanbanRepository: KanbanRepository,
  ) {}

  async execute({ id, titulo, descricao, codAtividades }: IKanbanProps) {
    const kanban = await this.kanbanRepository.updateDetails(id, { titulo, descricao, codAtividades })

    return kanban
  }
}