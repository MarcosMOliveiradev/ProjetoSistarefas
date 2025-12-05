import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts"
import { AverageTime } from "../averageTime.ts"

export function makeAverageTime() {
  const repositories = new TarefasDrizzleRepository()
  const makeContagemSetor = new AverageTime(repositories)

  return makeContagemSetor
}