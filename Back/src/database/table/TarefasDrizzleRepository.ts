import { and, eq } from "drizzle-orm";
import { count, desc, sql, sum } from "drizzle-orm/sql"
import type { Tarefas } from "../../application/entities/tarefa.ts";
import { TarefasRepository, type IUpdataTarefas } from "../../application/repositories/TarefasRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";
import type { tarefas, tarefasDTO } from "../../DTOs/TarefasDTO.ts";
import type { ContagemTotal, CountCodigo, CountDepartment, Meses, TopFiveCod, TotalTarefas } from "../../DTOs/countDepartmentDTO.ts";
import type { SearchType } from "../../application/useCase/tarefas/searchTarefas.ts";

export class TarefasDrizzleRepository extends TarefasRepository {
  async searchTarefasByType(type: SearchType, value: string | number, userId?: string): Promise<tarefasDTO[]> {
    if(userId) {
      const tarefas = await db.select().from(schema.tarefas).where(and(
        eq(schema.tarefas.usuarioId, userId),
        eq(schema.tarefas.ativado, true),
        eq(schema.tarefas[type], value)
      )).innerJoin(schema.atividade, eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))

      return tarefas
    } else {
      const tarefas = await db.select().from(schema.tarefas).where(eq(schema.tarefas[type], value)).innerJoin(schema.atividade, eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))

      return tarefas
    }
  }
  async findById(id: string): Promise<tarefasDTO> {
    const [tarefas] = await db.select().from(schema.tarefas).where(eq(schema.tarefas.id, id)).innerJoin(schema.atividade, eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))

    return tarefas
  }
  async updateTarefa(data: IUpdataTarefas): Promise<void> {
    await db.update(schema.tarefas).set({
      data: data.data,
      item: data.item,
      cod_atividade: data.codAtividade,
      id_documento: data.idDocumento,
      qtd_folha: data.qtdFolha ?? 0,
      h_inicio: data.h_inicio,
      h_termino: data.h_termino,
      n_atendimento: data.nAtendimento
    }).where(eq(schema.tarefas.id, data.id))
  }
  async listTarefasByDateInterval(startDate: string, endDate: string, userId: string): Promise<tarefasDTO[]> {
    const tarefasByInterval = await db.select().from(schema.tarefas)
                                      .innerJoin(schema.atividade, eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))
                                      .where(and(
                                        eq(schema.tarefas.usuarioId, userId),
                                        eq(schema.tarefas.ativado, true),
                                        sql`TO_DATE(${schema.tarefas.data}, 'DD/MM/YYYY') BETWEEN TO_DATE(${startDate}, 'DD/MM/YYYY') AND TO_DATE(${endDate}, 'DD/MM/YYYY')`
                                      )).orderBy(sql`TO_DATE(${schema.tarefas.data}, 'DD/MM/YYYY') ASC`)
    return tarefasByInterval
  }

  async totalTarefas(): Promise<TotalTarefas> {
    const [total] = await db.select({
      total: count(schema.tarefas.id)
    }).from(schema.tarefas)
      .innerJoin(schema.user, eq(schema.tarefas.usuarioId, schema.user.id))
      .where(and(
        eq(schema.tarefas.ativado, true),
        eq(schema.user.ativado, true)
      )
    )

    if(!total) {
      return { total: 0 }
    }

    return total ?? {total: 0}
  }

  async qtdMeses(userId: string): Promise<Meses[] | null> {
    const meses = await db.select({
      mes: sql<string>`TO_CHAR(TO_DATE(${schema.tarefas.data}, 'DD/MM/YYYY'), 'MM/YYYY')`,
      total: sql<number>`COUNT(*)`
    })
      .from(schema.tarefas)
      .where(
        and(
          eq(schema.tarefas.usuarioId, userId),
          eq(schema.tarefas.ativado, true)
        )
      )
      .groupBy(sql`TO_CHAR(TO_DATE(${schema.tarefas.data}, 'DD/MM/YYYY'), 'MM/YYYY')`)
      .orderBy(sql`TO_CHAR(TO_DATE(${schema.tarefas.data}, 'DD/MM/YYYY'), 'MM/YYYY')`)
  
    return meses
  }

  async top5atividedes(userId: string): Promise<TopFiveCod[] | null> {
    const result = await db.select({
      atividades: schema.tarefas.cod_atividade,
      nome: schema.atividade.descricao,
      total: count(schema.tarefas.cod_atividade)
    }).from(schema.tarefas)
      .innerJoin(schema.atividade, 
        eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))
      .where(
        and(
          eq(schema.tarefas.usuarioId, userId),
          eq(schema.tarefas.ativado, true)
        )
      )
      .groupBy(schema.tarefas.cod_atividade, schema.atividade.descricao).orderBy(desc(count(schema.tarefas.cod_atividade))).limit(5)

    return result
  }

  async averageTime(userId: string): Promise<number | null> {
    const [result] = await db.select({
      totalTempo: sql<number>`SUM(${schema.tarefas.h_termino} - ${schema.tarefas.h_inicio})`,
      totalTarefas: count(schema.tarefas)
    }).from(schema.tarefas).where(and(
          eq(schema.tarefas.usuarioId, userId),
          eq(schema.tarefas.ativado, true)
        ))

    if( !result || result.totalTarefas === 0 ) return null

    const totalTempoNumeric = Number(result.totalTempo)

    const tempoMedio = Math.round(totalTempoNumeric / result.totalTarefas)

    return tempoMedio
  }

  async contagem(userId: string): Promise<ContagemTotal> {
    const [contagem] = await db.select({
      total: count(schema.tarefas)
    }).from(schema.tarefas).where(and(
          eq(schema.tarefas.usuarioId, userId),
          eq(schema.tarefas.ativado, true)
        ))
    
    if (!contagem) {
      return { total: 0 }
    }
    return contagem
  }

  async contagemCodigo(userId: string, codigo: number): Promise<CountCodigo> {
    const [countCodigoResponse] = await db.select({
      codigo: schema.atividade.cod_atividade,
      total: count(schema.atividade.cod_atividade)
    }).from(schema.tarefas)
      .innerJoin(schema.atividade, eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))
      .where(and(
        eq(schema.tarefas.usuarioId, userId),
        eq(schema.atividade.cod_atividade, codigo),
        eq(schema.tarefas.ativado, true)
      ))
      .groupBy(schema.atividade.cod_atividade)
    
    if (!countCodigoResponse) {
      return {
        codigo,
        total: 0
      }
    }

    return countCodigoResponse
  }
  
  async countDepartment(userId: string, setor: string): Promise<CountDepartment> {
    const [countDepartmentResponse] = await db.select({
      setor: schema.atividade.setor,
      total: count(schema.atividade.setor)
    }).from(schema.tarefas)
      .innerJoin(schema.atividade, eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))
      .where(and(
        eq(schema.tarefas.usuarioId, userId),
        eq(schema.atividade.setor, setor),
        eq(schema.tarefas.ativado, true)
      ))
      .groupBy(schema.atividade.setor)
    
    if (!countDepartmentResponse) {
      return {
        setor,
        total: 0
      }
    }
    return countDepartmentResponse
  }

  async deleteTarefa(id: string, ativado: boolean, userId: string): Promise<void> {
    await db.update(schema.tarefas).set({ativado: ativado, updatedAt: new Date }).where(and(eq(schema.tarefas.id, id), eq(schema.tarefas.usuarioId, userId)))
  }

  async listTarefas(data: string, userId: string): Promise<tarefasDTO[]> {
    const tarefas = await db.select().from(schema.tarefas)
    .where(and(eq(schema.tarefas.data, data), eq(schema.tarefas.usuarioId, userId), eq(schema.tarefas.ativado, true)))
    .innerJoin(schema.atividade, eq(schema.tarefas.cod_atividade, schema.atividade.cod_atividade))

    return tarefas
  }
  
  async create(data: Tarefas): Promise<tarefas> {
    const [tarefas] = await db.insert(schema.tarefas).values({
      id: data.id,
      data: data.data,
      item: data.item,
      cod_atividade: data.codAtividade,
      id_documento: data.idDocumento,
      qtd_folha: data.qtdFolha ? data.qtdFolha : 0,
      h_inicio: data.hInicio,
      h_termino: data.hTermino,
      n_atendimento: data.nAtendimento,
      ativado: data.ativado,
      usuarioId: data.userId,
      createdAt: data.createdAt,
    }).returning()

    return tarefas
  }
}