import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts"
import { ListTarefasByInterval } from "../ListTarefasByInterval.ts"

export function makeListTarefasByInterval() {

  const repositories = new TarefasDrizzleRepository()
  const listTarefas = new ListTarefasByInterval(repositories)

  return listTarefas
  
}