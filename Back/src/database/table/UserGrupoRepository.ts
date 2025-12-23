import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import type { UserGrupos } from "../../application/entities/userGrupos.ts";
import { UserGrupoRepository } from "../../application/repositories/UserGrupoRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export class UserGrupoDrizzleRepository extends UserGrupoRepository {
  async findGrupoAtivo(userId: string, date: Date): Promise<UserGrupos | null> {
    const [row] = await db
    .select()
    .from(schema.userGrupos)
    .where(
      and(
        eq(schema.userGrupos.userId, userId),
        lte(schema.userGrupos.dataInicio, toDateOnly(date)),
        or(
          isNull(schema.userGrupos.dataFim),
          gte(schema.userGrupos.dataFim, toDateOnly(date))
        )
      )
    );

    if(!row) return null

    return row
  }
  
  async vincular(userGrupo: UserGrupos): Promise<void> {
    await db.insert(schema.userGrupos).values({
      id: userGrupo.id,
      userId: userGrupo.userId,
      grupoId: userGrupo.grupoId,
      dataInicio: toDateOnly(userGrupo.dataInicio),
      dataFim: userGrupo.dataFim ? toDateOnly(userGrupo.dataFim) : null
    })
  }

  async findGrupoAtivoDoUsuario(userId: string): Promise<UserGrupos | null> {
    const [row] = await db
    .select()
    .from(schema.userGrupos)
    .where(
      and(
        eq(schema.userGrupos.userId, userId)
      )
    );

    if(!row) return null

    return row
  }

  async findHistoricoDoUsuario(userId: string): Promise<UserGrupos[]> {
    const rows = await db
      .select()
      .from(schema.userGrupos)
      .where(eq(schema.userGrupos.userId, userId))
      .orderBy(schema.userGrupos.dataInicio);
    
      return rows
  }
  async encerrarVinculo(id: string, dataFim: Date): Promise<void> {
    await db
    .update(schema.userGrupos)
    .set({
      dataFim: toDateOnly(dataFim),
    })
    .where(eq(schema.userGrupos.id, id));
  }
}