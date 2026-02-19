import { eq, sql } from "drizzle-orm";
import { Kanban } from "../../application/entities/kanban.ts";
import type { kanbanStatusEnum } from "../../application/entities/Roles.ts";
import { KanbanRepository } from "../../application/repositories/kanbanRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export class KanbanDrizzleRepository extends KanbanRepository {
  
  async create(kanban: Kanban): Promise<void> {
    await db.insert(schema.kanban).values({
      id: kanban.id,
      titulo: kanban.titulo,
      descricao: kanban.descricao,
      codAtividades: kanban.codAtividades,
      criadoPor: kanban.criadoPor,
      criadoEm: toDateOnly(kanban.criadoEm)
    })
  }
  async find(): Promise<Kanban[]> {
    const kanban = await db.select({
      id: schema.kanban.id,
      titulo: schema.kanban.titulo,
      descricao: schema.kanban.descricao,
      criadoPor: schema.kanban.criadoPor,
      criadoEm: schema.kanban.criadoEm,
      iniciadoPor: schema.kanban.iniciadoPor,
      iniciadoEm: schema.kanban.iniciadoEm,
      canceladoPor: schema.kanban.canceladoPor,
      canceladoEm: schema.kanban.canceladoEm,
      motivoCancelamento: schema.kanban.motivoCancelamento,

      // ✅ array de colaboradores [{id, name}, ...]
      colaboradores: sql<
        Array<{ id: string; name: string }>
      >`
        COALESCE(
          json_agg(
            DISTINCT jsonb_build_object(
              'id', ${schema.user.id},
              'name', ${schema.user.name}
            )
          ) FILTER (WHERE ${schema.user.id} IS NOT NULL),
          '[]'::json
        )
      `.as("colaboradores"),
    })
    .from(schema.kanban)
    .leftJoin(
      schema.kanbanColaboradores,
      eq(schema.kanbanColaboradores.kanbanId, schema.kanban.id)
    )
    .leftJoin(
      schema.user,
      eq(schema.user.id, schema.kanbanColaboradores.userId)
    ).groupBy(
      schema.kanban.id,
      schema.kanban.titulo,
      schema.kanban.descricao,
      schema.kanban.criadoPor,
      schema.kanban.criadoEm,
      schema.kanban.iniciadoPor,
      schema.kanban.iniciadoEm,
      schema.kanban.canceladoPor,
      schema.kanban.canceladoEm,
      schema.kanban.motivoCancelamento
    );
    
    return kanban
  }

  async findById(id: string): Promise<Kanban | null> {
    throw new Error("Method not implemented.");
  }
  async findStatus(status: kanbanStatusEnum): Promise<Kanban[]> {
    throw new Error("Method not implemented.");
  }
  async updateDetails(id: string, data: { titulo?: string; descricao?: string; codAtividades?: number; }): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async start(id: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async finish(id: string, userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async cancel(id: string, userId: string, motivo?: string | null): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}