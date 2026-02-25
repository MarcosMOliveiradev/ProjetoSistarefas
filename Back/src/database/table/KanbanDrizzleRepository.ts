import { and, eq, inArray, sql } from "drizzle-orm";
import { Kanban } from "../../application/entities/kanban.ts";
import type { kanbanStatusEnum } from "../../application/entities/Roles.ts";
import { KanbanRepository } from "../../application/repositories/kanbanRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";
import { alias } from "drizzle-orm/pg-core";

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
    const criador = alias(schema.user, "criador");
    const iniciador = alias(schema.user, "iniciador");
    const finalizador = alias(schema.user, "finalizador");
    const cancelador = alias(schema.user, "cancelador");

    // ⚠️ este alias é só para join dos colaboradores
    const colabUser = alias(schema.user, "colab_user");

    const kanban = await db
      .select({
        id: schema.kanban.id,
        titulo: schema.kanban.titulo,
        status: schema.kanban.status,
        descricao: schema.kanban.descricao,

        criadoPor: criador.name,
        criadoEm: schema.kanban.criadoEm,

        iniciadoPor: iniciador.name,
        iniciadoEm: schema.kanban.iniciadoEm,

        finalizadoPor: finalizador.name,
        finalizadoEm: schema.kanban.finalizadoEm,

        canceladoPor: cancelador.name,
        canceladoEm: schema.kanban.canceladoEm,
        motivoCancelamento: schema.kanban.motivoCancelamento,

        colaboradores: sql<Array<{ id: string; name: string; matricula: number }>>`
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', ${colabUser.id},
                'name', ${colabUser.name},
                'matricula', ${colabUser.matricula}
              )
            ) FILTER (WHERE ${colabUser.id} IS NOT NULL),
            '[]'::json
          )
        `.as("colaboradores"),
      })
      .from(schema.kanban)

      .leftJoin(criador, eq(criador.id, schema.kanban.criadoPor))
      .leftJoin(iniciador, eq(iniciador.id, schema.kanban.iniciadoPor))
      .leftJoin(finalizador, eq(finalizador.id, schema.kanban.finalizadoPor))
      .leftJoin(cancelador, eq(cancelador.id, schema.kanban.canceladoPor))

      .leftJoin(
        schema.kanbanColaboradores,
        eq(schema.kanbanColaboradores.kanbanId, schema.kanban.id)
      )
      .leftJoin(colabUser, eq(colabUser.id, schema.kanbanColaboradores.userId))

      .groupBy(
        schema.kanban.id,
        schema.kanban.titulo,
        schema.kanban.status,
        schema.kanban.descricao,
        schema.kanban.criadoEm,
        schema.kanban.iniciadoEm,
        schema.kanban.finalizadoEm,
        schema.kanban.canceladoEm,
        schema.kanban.motivoCancelamento,

        criador.name,
        iniciador.name,
        finalizador.name,
        cancelador.name
      );

    return kanban;
  }

  async findById(id: string): Promise<Kanban | null> {
    const criador = alias(schema.user, "criador");
    const iniciador = alias(schema.user, "iniciador");
    const finalizador = alias(schema.user, "finalizador");
    const cancelador = alias(schema.user, "cancelador");

    // ⚠️ este alias é só para join dos colaboradores
    const colabUser = alias(schema.user, "colab_user");

    const [kanban] = await db
      .select({
        id: schema.kanban.id,
        titulo: schema.kanban.titulo,
        status: schema.kanban.status,
        descricao: schema.kanban.descricao,

        criadoPor: criador.name,
        criadoEm: schema.kanban.criadoEm,

        iniciadoPor: iniciador.name,
        iniciadoEm: schema.kanban.iniciadoEm,

        finalizadoPor: finalizador.name,
        finalizadoEm: schema.kanban.finalizadoEm,

        canceladoPor: cancelador.name,
        canceladoEm: schema.kanban.canceladoEm,
        motivoCancelamento: schema.kanban.motivoCancelamento,

        colaboradores: sql<Array<{ id: string; name: string; matricula: number }>>`
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', ${colabUser.id},
                'name', ${colabUser.name},
                'matricula', ${colabUser.matricula}
              )
            ) FILTER (WHERE ${colabUser.id} IS NOT NULL),
            '[]'::json
          )
        `.as("colaboradores"),
      })
      .from(schema.kanban)
      .where(eq(schema.kanban.id, id))

      .leftJoin(criador, eq(criador.id, schema.kanban.criadoPor))
      .leftJoin(iniciador, eq(iniciador.id, schema.kanban.iniciadoPor))
      .leftJoin(finalizador, eq(finalizador.id, schema.kanban.finalizadoPor))
      .leftJoin(cancelador, eq(cancelador.id, schema.kanban.canceladoPor))

      .leftJoin(
        schema.kanbanColaboradores,
        eq(schema.kanbanColaboradores.kanbanId, schema.kanban.id)
      )
      .leftJoin(colabUser, eq(colabUser.id, schema.kanbanColaboradores.userId))

      .groupBy(
        schema.kanban.id,
        schema.kanban.titulo,
        schema.kanban.status,
        schema.kanban.descricao,
        schema.kanban.criadoEm,
        schema.kanban.iniciadoEm,
        schema.kanban.finalizadoEm,
        schema.kanban.canceladoEm,
        schema.kanban.motivoCancelamento,

        criador.name,
        iniciador.name,
        finalizador.name,
        cancelador.name
      );

      if(!kanban) return null

    return kanban;
  }
  async findStatus(status: kanbanStatusEnum): Promise<Kanban[]> {
     const criador = alias(schema.user, "criador");
    const iniciador = alias(schema.user, "iniciador");
    const finalizador = alias(schema.user, "finalizador");
    const cancelador = alias(schema.user, "cancelador");

    // ⚠️ este alias é só para join dos colaboradores
    const colabUser = alias(schema.user, "colab_user");

    const [kanban] = await db
      .select({
        id: schema.kanban.id,
        titulo: schema.kanban.titulo,
        status: schema.kanban.status,
        descricao: schema.kanban.descricao,

        criadoPor: criador.name,
        criadoEm: schema.kanban.criadoEm,

        iniciadoPor: iniciador.name,
        iniciadoEm: schema.kanban.iniciadoEm,

        finalizadoPor: finalizador.name,
        finalizadoEm: schema.kanban.finalizadoEm,

        canceladoPor: cancelador.name,
        canceladoEm: schema.kanban.canceladoEm,
        motivoCancelamento: schema.kanban.motivoCancelamento,

        colaboradores: sql<Array<{ id: string; name: string; matricula: number }>>`
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', ${colabUser.id},
                'name', ${colabUser.name},
                'matricula', ${colabUser.matricula}
              )
            ) FILTER (WHERE ${colabUser.id} IS NOT NULL),
            '[]'::json
          )
        `.as("colaboradores"),
      })
      .from(schema.kanban)
      .where(eq(schema.kanban.status, status))

      .leftJoin(criador, eq(criador.id, schema.kanban.criadoPor))
      .leftJoin(iniciador, eq(iniciador.id, schema.kanban.iniciadoPor))
      .leftJoin(finalizador, eq(finalizador.id, schema.kanban.finalizadoPor))
      .leftJoin(cancelador, eq(cancelador.id, schema.kanban.canceladoPor))

      .leftJoin(
        schema.kanbanColaboradores,
        eq(schema.kanbanColaboradores.kanbanId, schema.kanban.id)
      )
      .leftJoin(colabUser, eq(colabUser.id, schema.kanbanColaboradores.userId))

      .groupBy(
        schema.kanban.id,
        schema.kanban.titulo,
        schema.kanban.status,
        schema.kanban.descricao,
        schema.kanban.criadoEm,
        schema.kanban.iniciadoEm,
        schema.kanban.finalizadoEm,
        schema.kanban.canceladoEm,
        schema.kanban.motivoCancelamento,

        criador.name,
        iniciador.name,
        finalizador.name,
        cancelador.name
      );

      if(!kanban) return null

    return kanban;
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