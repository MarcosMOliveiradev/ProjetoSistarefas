import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { ListaTarefas } from "../ListTarefas.ts";

export function makeListTarefas() {

  const repositories = new TarefasDrizzleRepository()
  const listTarefas = new ListaTarefas(repositories)

  return listTarefas
  
}