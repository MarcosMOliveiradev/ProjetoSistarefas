import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { TotalTarefas } from "../totalTarefas.ts";

export function makeTotalTarefas() {
  const repositories = new TarefasDrizzleRepository()
  const totalTarefas = new TotalTarefas(repositories)

  return totalTarefas
}