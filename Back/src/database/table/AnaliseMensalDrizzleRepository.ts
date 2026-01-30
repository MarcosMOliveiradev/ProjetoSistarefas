import { and, eq, sql } from "drizzle-orm";
import type { AnalisesMensais } from "../../application/entities/analisesMensais.ts";
import { AnaliseMensalRepository } from "../../application/repositories/AnaliseMensalRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class AnaliseMensalDrizzleRepository extends AnaliseMensalRepository {
  async countAnalise(usuarioId: string): Promise<{ total: number; }> {
    const [total] = await db.select({
      total: sql<number>`COUNT(*)`
    }).from(schema.analisesMensais).where(eq(schema.analisesMensais.usuarioId, usuarioId))

    return total
  }
  async findAnaliseComAtrasos(usuarioId: string, mes: number, ano: number): Promise<AnalisesMensais> {
    const [row] = await db
    .select({
      id: schema.analisesMensais.id,
      mes: schema.analisesMensais.mes,
      ano: schema.analisesMensais.ano,
      diasEsperados: schema.analisesMensais.diasEsperados,
      diasCumpridos: schema.analisesMensais.diasCumpridos,
      percentual: schema.analisesMensais.percentual,
      selo: schema.analisesMensais.selo,
      faltas: sql<number>`
        COUNT(
          CASE 
            WHEN ${schema.presenca.status} = 'FALTA' 
            THEN 1 
          END
        )
      `.as('falta'),
      atrasos: sql<number>`
        COUNT(
          CASE 
            WHEN ${schema.presenca.status} = 'ATRASADO' 
            THEN 1 
          END
        )
      `.as('atrasos'),
    })
    .from(schema.analisesMensais)
    .innerJoin(
      schema.presenca,
      eq(schema.analisesMensais.usuarioId, schema.presenca.userId)
    )
    .where(
      and(
        eq(schema.analisesMensais.usuarioId, usuarioId),
        eq(schema.analisesMensais.mes, mes),
        eq(schema.analisesMensais.ano, ano),
        sql`
          EXTRACT(MONTH FROM ${schema.presenca.data}) = ${schema.analisesMensais.mes}
          AND EXTRACT(YEAR FROM ${schema.presenca.data}) = ${schema.analisesMensais.ano}
        `
      )
    )
    .groupBy(
      schema.analisesMensais.id,
      schema.analisesMensais.mes,
      schema.analisesMensais.ano,
      schema.analisesMensais.diasEsperados,
      schema.analisesMensais.diasCumpridos,
      schema.analisesMensais.percentual,
      schema.analisesMensais.selo
    )
    .orderBy(
      schema.analisesMensais.ano,
      schema.analisesMensais.mes
    )
    
    return row
  }

  async create(analise: AnalisesMensais): Promise<void> {
    await db.insert(schema.analisesMensais).values({
      ano: analise.ano,
      usuarioId: analise.usuarioId,
      mes: analise.mes,
      diasEsperados: analise.diasEsperados,
      diasCumpridos: analise.diasCumpridos,
      percentual: analise.percentual.toFixed(2),
      selo: analise.selo,
      geradoEm: analise.geradoEm
    })
  }
  async findByUserAndPeriod(userId: string, mes: number, ano: number): Promise<AnalisesMensais | null> {
    const [row] = await db.select()
      .from(schema.analisesMensais)
        .where(
          and(
            eq(schema.analisesMensais.usuarioId, userId),
            eq(schema.analisesMensais.mes, mes),
            eq(schema.analisesMensais.ano, ano)
          )
        );
    
    if(!row) return null


    return row
  }
  async findHistoricoUsuario(userId: string): Promise<AnalisesMensais[]> {
  const rows = await db
    .select({
      id: schema.analisesMensais.id,
      mes: schema.analisesMensais.mes,
      ano: schema.analisesMensais.ano,
      diasEsperados: schema.analisesMensais.diasEsperados,
      diasCumpridos: schema.analisesMensais.diasCumpridos,
      percentual: schema.analisesMensais.percentual,
      selo: schema.analisesMensais.selo,
      atrasos: sql<number>`
        COUNT(
          CASE 
            WHEN ${schema.presenca.status} = 'ATRASADO' 
            THEN 1 
          END
        )
      `.as('atrasos'),
    })
    .from(schema.analisesMensais)
    .innerJoin(
      schema.presenca,
      eq(schema.analisesMensais.usuarioId, schema.presenca.userId)
    )
    .where(
      and(
        eq(schema.analisesMensais.usuarioId, userId),
        sql`
          EXTRACT(MONTH FROM ${schema.presenca.data}) = ${schema.analisesMensais.mes}
          AND EXTRACT(YEAR FROM ${schema.presenca.data}) = ${schema.analisesMensais.ano}
        `
      )
    )
    .groupBy(
      schema.analisesMensais.id,
      schema.analisesMensais.mes,
      schema.analisesMensais.ano,
      schema.analisesMensais.diasEsperados,
      schema.analisesMensais.diasCumpridos,
      schema.analisesMensais.percentual,
      schema.analisesMensais.selo
    )
    .orderBy(
      schema.analisesMensais.ano,
      schema.analisesMensais.mes
    )

  return rows
}
}