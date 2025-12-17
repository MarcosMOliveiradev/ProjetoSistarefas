import { and, eq, gte, or } from "drizzle-orm";
import type { UserGrupos } from "../../application/entities/userGrupos.ts";
import { UserGrupoRepository } from "../../application/repositories/UserGrupoRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";
import { lte } from "zod";

function toDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export class UserGrupoDrizzleRepository extends UserGrupoRepository {
  async vincular(userGrupo: UserGrupos): Promise<void> {
    await db.insert(schema.userGrupos).values({
      id: userGrupo.id,
      userId: userGrupo.userId,
      grupoId: userGrupo.grupoId,
      dataInicio: userGrupo.dataInicio,
      dataFim: userGrupo.dataFim ?? null
    })
  }

  async findGrupoAtivoDoUsuario(userId: string, date: Date): Promise<UserGrupos | null> {
    const [row] = await db.select().from(schema.userGrupos).where(and(
      eq(schema.userGrupos.userId, userId),
      lte(schema.userGrupos.dataInicio, toDateOnly(date)),
      or(schema.userGrupos.dataFim.isNull(), gte(schema.userGrupos.dataFim, toDateOnly(date)))
    ))

    if(!row) return null

    return rowId
  }

  async findHistoricoDoUsuario(userId: string): Promise<UserGrupos[]> {
    throw new Error("Method not implemented.");
  }
  async encerrarVinculo(id: string, dataFim: Date): Promise<void> {
    throw new Error("Method not implemented.");
  }
}