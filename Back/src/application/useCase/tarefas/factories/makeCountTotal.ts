import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { contagemTotal } from "../contagemTotal.ts";

export function makeCountTotal() {
  const repositories = new TarefasDrizzleRepository()
  const makeContagemSetor = new contagemTotal(repositories)

  return makeContagemSetor
}