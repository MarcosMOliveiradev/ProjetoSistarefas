import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts"
import { TopFiveActive } from "../topFiveActive.ts"

export function makeTopFive() {
  const repositories = new TarefasDrizzleRepository()
  const makeContagemSetor = new TopFiveActive(repositories)

  return makeContagemSetor
}