import type { KanbanColaborador } from "../entities/kanbanColaboradores.ts";

export abstract class KanbanColaboradoresRepository {
  abstract add(kanbanId: string, userId: string): Promise<void>;
  abstract remove(kanbanId: string, userId: string): Promise<void>;
  abstract listByKanbanId(kanbanId: string): Promise<KanbanColaborador[]>;
}