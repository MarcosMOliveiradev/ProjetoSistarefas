import type { KanbanColaborador } from "../../application/entities/kanbanColaboradores.ts";
import { KanbanColaboradoresRepository } from "../../application/repositories/KanbanColaboradoresRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class KanbanColaboradoresDrizzleRepository extends KanbanColaboradoresRepository {
  async add(kanbanId: string, userId: string): Promise<void> {
    await db.insert(schema.kanbanColaboradores).values({
      kanbanId,
      userId,
      adicionandoEm: new Date()
    })
  }
  remove(kanbanId: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listByKanbanId(kanbanId: string): Promise<KanbanColaborador[]> {
    throw new Error("Method not implemented.");
  }
}