import { and, eq, inArray, sql } from "drizzle-orm";
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
      status: schema.kanban.status,
      descricao: schema.kanban.descricao,
      criadoPor: schema.kanban.criadoPor,
      criadoEm: schema.kanban.criadoEm,
      iniciadoPor: schema.kanban.iniciadoPor,
      iniciadoEm: schema.kanban.iniciadoEm,
      finalizadoPor: schema.kanban.finalizadoPor,
      finalizadoEm: schema.kanban.finalizadoEm,
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
    const [kanban] = await db.select({
      id: schema.kanban.id,
      titulo: schema.kanban.titulo,
      status: schema.kanban.status,
      descricao: schema.kanban.descricao,
      criadoPor: schema.kanban.criadoPor,
      criadoEm: schema.kanban.criadoEm,
      iniciadoPor: schema.kanban.iniciadoPor,
      iniciadoEm: schema.kanban.iniciadoEm,
      finalizadoPor: schema.kanban.finalizadoPor,
      finalizadoEm: schema.kanban.finalizadoEm,
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
    .where(eq(schema.kanban.id, id))
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

    if(!kanban) return null;

    return kanban
  }
  async findStatus(status: kanbanStatusEnum): Promise<Kanban[]> {
    const kanban = await db.select({
      id: schema.kanban.id,
      titulo: schema.kanban.titulo,
      status: schema.kanban.status,
      descricao: schema.kanban.descricao,
      criadoPor: schema.kanban.criadoPor,
      criadoEm: schema.kanban.criadoEm,
      iniciadoPor: schema.kanban.iniciadoPor,
      iniciadoEm: schema.kanban.iniciadoEm,
      finalizadoPor: schema.kanban.finalizadoPor,
      finalizadoEm: schema.kanban.finalizadoEm,
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
    .where(eq(schema.kanban.status, status))
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
  async updateDetails(id: string, data: { titulo?: string; descricao?: string; codAtividades?: number; }): Promise<void> {
    await db.update(schema.kanban).set({
      titulo: data.titulo,
      descricao: data.descricao,
      codAtividades: data.codAtividades,
    }).where(eq(schema.kanban.id, id))
  }
  async start(id: string, userId: string): Promise<void> {
    await db.transaction(async (tx) => {
      const update = await tx.update(schema.kanban).set({
        status: "IN_PROGRESS",
        iniciadoPor: sql`COALESCE(${schema.kanban.iniciadoPor}, ${userId})`,
        iniciadoEm: sql`COALESCE(${schema.kanban.iniciadoEm}, NOW())`
      }).where(and(
        eq(schema.kanban.id, id),
        inArray(schema.kanban.status, ["TODO", "IN_PROGRESS"])
      )).returning({ status: schema.kanban.status });

      if ( update.length === 0 ) {
        throw new Error("Não foi possível iniciar: Kanban não encontrado ou já encerrado.");
      }

      await tx.insert(schema.kanbanColaboradores).values({
        kanbanId: id,
        userId
      }).onConflictDoNothing();
    })
  }

  async finish(id: string, userId: string): Promise<void> {
    await db.transaction(async (tx) => {
      const update = await tx.update(schema.kanban).set({
        status: "DONE",
        finalizadoPor: sql`COALESCE(${schema.kanban.iniciadoPor}, ${userId})`,
        finalizadoEm: sql`COALESCE(${schema.kanban.iniciadoEm}, NOW())`
      }).where(and(
        eq(schema.kanban.id, id),
        inArray(schema.kanban.status, ["TODO", "IN_PROGRESS"])
      )).returning({ status: schema.kanban.status });

      if ( update.length === 0 ) {
        throw new Error("Não foi possível finalizar: Kanban não encontrado ou já encerrado.");
      }
    })
  }

  async cancel(id: string, userId: string, motivo?: string | null): Promise<void> {
    await db.transaction(async (tx) => {
      const updated = await tx
        .update(schema.kanban)
        .set({
          status: "CANCELED",

          canceladoPor: userId,
          canceladoEm: sql`NOW()`,
          motivoCancelamento: motivo ?? null,

          // ✅ coerência: ao cancelar não pode ficar finalizado
          finalizadoPor: null,
          finalizadoEm: null,
        })
        .where(
          and(
            eq(schema.kanban.id, id),
            // ❌ não deixa cancelar se já estiver DONE
            inArray(schema.kanban.status, ["TODO", "IN_PROGRESS"])
          )
        )
        .returning({ id: schema.kanban.id });

      if (updated.length === 0) {
        throw new Error(
          "Não foi possível cancelar: Kanban não encontrado ou já finalizado."
        );
      }
    });
  }
  async delete(id: string): Promise<void> {
    const result = await db
      .delete(schema.kanban)
      .where(eq(schema.kanban.id, id))
      .returning({ id: schema.kanban.id });

    if (result.length === 0) {
      throw new Error("Kanban não encontrado.");
    }
  }
}