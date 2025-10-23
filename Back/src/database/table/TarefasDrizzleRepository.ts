import type { Tarefas } from "../../application/entities/tarefa.ts";
import { TarefasRepository } from "../../application/repositories/TarefasRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class TarefasDrizzleRepository extends TarefasRepository {
  async create(data: Tarefas): Promise<Tarefas> {
    const [tarefas] = await db.insert(schema.tarefas).values({
      id: data.id,
      data: data.data,
      item: data.item,
      cod_atividade: data.codAtividade,
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