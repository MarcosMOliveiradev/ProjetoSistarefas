import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { SearchTarefas } from "../searchTarefas.ts";

export function makeSearchTarefas() {
  const repositories = new TarefasDrizzleRepository()
  const searchTarefas = new SearchTarefas(repositories)

  return searchTarefas
}