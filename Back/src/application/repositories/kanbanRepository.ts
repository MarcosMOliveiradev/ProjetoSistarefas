import type { Kanban } from "../entities/kanban.ts";
import type { kanbanStatusEnum } from "../entities/Roles.ts";

export abstract class KanbanRepository {
  abstract create(kanban: Kanban): Promise<void>

  abstract find(): Promise<Kanban[]>
  abstract findById(id: string): Promise<Kanban | null>
  abstract findStatus(status: kanbanStatusEnum): Promise<Kanban[]>

  abstract updateDetails(
    id: string,
    data: { titulo?: string; descricao?: string; codAtividades?: number }
  ): Promise<void>;

  abstract start(id: string, userId: string): Promise<void>
  abstract finish(id: string, userId: string): Promise<void>
  abstract cancel(id: string, userId: string, motivo?: string | null): Promise<void>

  abstract delete(id: string): Promise<void>
}