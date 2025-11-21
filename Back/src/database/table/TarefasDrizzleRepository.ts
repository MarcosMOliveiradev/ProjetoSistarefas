import { and, eq } from "drizzle-orm";
import type { Tarefas } from "../../application/entities/tarefa.ts";
import { TarefasRepository } from "../../application/repositories/TarefasRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class TarefasDrizzleRepository extends TarefasRepository {
  async listTarefas(data: string, userId: string): Promise<Tarefas[]> {
    const tarefas = await db.select().from(schema.tarefas)
    .where(and(eq(schema.tarefas.data, data), eq(schema.tarefas.usuarioId, userId)))
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