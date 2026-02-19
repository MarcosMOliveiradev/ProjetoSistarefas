import { Kanban } from "../../entities/kanban.ts";
import type { KanbanColaboradoresRepository } from "../../repositories/KanbanColaboradoresRepository.ts";
import type { KanbanRepository } from "../../repositories/kanbanRepository.ts";

interface ICreateKanbanProps {
  titulo: string
  descricao: string
  codAtividades: number,
  criadoPor: string,
  criadoEm: Date
}

export class CreateKanban {
  constructor(
    private kanbanRepository: KanbanRepository,
    private kanbanColaboradoresRepository: KanbanColaboradoresRepository
  ) {}

  async execute({ titulo, descricao, codAtividades, criadoPor, criadoEm }: ICreateKanbanProps) {
    const kanban = Kanban.create({
      titulo,
      descricao,
      codAtividades,
      criadoPor,
      criadoEm: criadoEm ?? new Date(),
    })

    await this.kanbanRepository.create(kanban)
    await this.kanbanColaboradoresRepository.add(kanban.id, criadoPor)
  }
}

