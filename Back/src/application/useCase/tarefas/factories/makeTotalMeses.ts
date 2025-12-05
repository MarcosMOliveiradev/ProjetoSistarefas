import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts"
import { TotalMeses } from "../TotalMeses.ts"

export function makeTotalMeses() {
  const repositories = new TarefasDrizzleRepository()
  const makeContagemSetor = new TotalMeses(repositories)

  return makeContagemSetor
}