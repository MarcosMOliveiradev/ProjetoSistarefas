import { and, eq } from "drizzle-orm";
import { count, sql, sum } from "drizzle-orm/sql"
import type { Tarefas } from "../../application/entities/tarefa.ts";
import { TarefasRepository } from "../../application/repositories/TarefasRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";
import type { tarefasDTO } from "../../DTOs/TarefasDTO.ts";
import type { ContagemTotal, CountCodigo, CountDepartment } from "../../DTOs/countDepartmentDTO.ts";

export class TarefasDrizzleRepository extends TarefasRepository {

  async averageTime(userId: string): Promise<number | null> {
    const [result] = await db.select({
      totalTempo: sql<number>`SUM(${schema.tarefas.h_termino} - ${schema.tarefas.h_inicio})`,
      totalTarefas: count(schema.tarefas)
    }).from(schema.tarefas).where(eq(schema.tarefas.usuarioId, userId))

    if( !result || result.totalTarefas === 0 ) return null

    const tempoMedio = result.totalTempo / result.totalTarefas

    return tempoMedio
  }

  async contagem(userId: string): Promise<ContagemTotal> {
    const [contagem] = await db.select({
      total: count(schema.tarefas)
    }).from(schema.tarefas).where(eq(schema.tarefas.usuarioId, userId))

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
        eq(schema.atividade.cod_atividade, codigo)
      ))
      .groupBy(schema.atividade.cod_atividade)

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
        eq(schema.atividade.setor, setor)
      ))
      .groupBy(schema.atividade.setor)
    
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
  
  async create(data: Tarefas): Promise<Tarefas> {
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