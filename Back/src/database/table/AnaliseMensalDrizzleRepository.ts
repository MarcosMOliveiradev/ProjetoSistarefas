import { and, eq, sql } from "drizzle-orm";
import type { AnalisesMensais } from "../../application/entities/analisesMensais.ts";
import { AnaliseMensalRepository } from "../../application/repositories/AnaliseMensalRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class AnaliseMensalDrizzleRepository extends AnaliseMensalRepository {
  async findAnaliseForPeriod(mes: number, ano: number): Promise<AnalisesMensais[]> {
    const row = await db.select({
      id: schema.analisesMensais.id,
      usuario: schema.user.name,
      matricula: schema.user.matricula,
      mes: schema.analisesMensais.mes,
      ano: schema.analisesMensais.ano,
      diasEsperadosEmpresa: schema.analisesMensais.diasEsperadosEmpresa,
      diasCumpridosEmpresa: schema.analisesMensais.diasCumpridosEmpresa,
      diasEsperadosInstituicao: schema.analisesMensais.diasEsperadosInstituicao,
      diasCumpridosInstituicao: schema.analisesMensais.diasCumpridosInstituicao,
      atrasos: schema.analisesMensais.atrasos,
      percentualEmpresa: schema.analisesMensais.percentualEmpresa,
      percentualIntituicao: schema.analisesMensais.percentualIntituicao,
      selo: schema.analisesMensais.selo,
    }).from(schema.analisesMensais).where(and(
      eq(schema.analisesMensais.mes, mes),
      eq(schema.analisesMensais.ano, ano)
    )).innerJoin(schema.user, eq(schema.analisesMensais.usuarioId, schema.user.id))
    .orderBy(
      schema.analisesMensais.mes,
      schema.analisesMensais.ano
    )

    return row
  }
  async countAnalise(usuarioId: string): Promise<{ total: number; }> {
    const [total] = await db.select({
      total: sql<number>`COUNT(*)`
    }).from(schema.analisesMensais).where(eq(schema.analisesMensais.usuarioId, usuarioId))

    return total
  }
  async findAnaliseComAtrasos(usuarioId: string, mes: number, ano: number): Promise<AnalisesMensais> {
     const [row] = await db
    .select()
    .from(schema.analisesMensais)
    .where(
      and(
        eq(schema.analisesMensais.usuarioId, usuarioId),
        eq(schema.analisesMensais.mes, mes),
        eq(schema.analisesMensais.ano, ano)
      )
    )

  return row ?? null
  }
async create(analise: AnalisesMensais): Promise<void> {
  await db.insert(schema.analisesMensais).values({
    id: analise.id,

    usuarioId: analise.usuarioId,
    mes: analise.mes,
    ano: analise.ano,

    diasEsperadosEmpresa: analise.diasEsperadosEmpresa,
    diasEsperadosInstituicao: analise.diasEsperadosInstituicao,

    diasCumpridosEmpresa: analise.diasCumpridosEmpresa,
    diasCumpridosInstituicao: analise.diasCumpridosInstituicao,

    atrasos: analise.atrasos,

    percentualEmpresa: analise.percentualEmpresa.toFixed(2),
    percentualIntituicao: analise.percentualInstituicao.toFixed(2),

    selo: analise.selo,
    geradoEm: analise.geradoEm,
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
  const row = await db
    .select()
    .from(schema.analisesMensais)
    .where(
      and(
        eq(schema.analisesMensais.usuarioId, userId),
      )
    )

  return row ?? null
  }
}