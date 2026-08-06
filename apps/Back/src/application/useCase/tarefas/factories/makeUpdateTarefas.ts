import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { UpdateTarefas } from "../updateTarefas.ts";

export function makeUpdateTarefas() {
  const repositoriesTarefas = new TarefasDrizzleRepository()
  const updateTarefas = new UpdateTarefas(repositoriesTarefas)

  return updateTarefas
}