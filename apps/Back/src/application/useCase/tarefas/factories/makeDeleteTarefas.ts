import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { DeletTarefas } from "../deletTarefas.ts";

export function makeDeleteTarefas() {
  const repositories = new TarefasDrizzleRepository()
  const deleteTarefa = new DeletTarefas(repositories)

  return deleteTarefa
}