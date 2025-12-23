import { and, eq } from "drizzle-orm";
import type { AnalisesMensais } from "../../application/entities/analisesMensais.ts";
import { AnaliseMensalRepository } from "../../application/repositories/AnaliseMensalRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class AnaliseMensalDrizzleRepository extends AnaliseMensalRepository {
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
      .select()
      .from(schema.analisesMensais)
      .where(eq(schema.analisesMensais.usuarioId, userId))
      .orderBy(schema.analisesMensais.ano, schema.analisesMensais.mes);

    return rows
  }
}