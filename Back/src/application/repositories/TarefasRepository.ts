import type { Tarefas } from "../entities/tarefa.ts";

export abstract class TarefasRepository {
  abstract create(data: Tarefas): Promise<Tarefas>
}