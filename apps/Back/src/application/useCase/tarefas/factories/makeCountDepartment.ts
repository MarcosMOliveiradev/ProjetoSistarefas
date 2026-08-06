import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { ContagemSetor } from "../contagemSetor.ts";

export function makeCountDepartment() {
  const repositories = new TarefasDrizzleRepository()
  const makeContagemSetor = new ContagemSetor(repositories)

  return makeContagemSetor
}