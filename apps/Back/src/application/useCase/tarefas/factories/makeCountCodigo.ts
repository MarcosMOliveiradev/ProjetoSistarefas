import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { ContagemCodigo } from "../contagemCodigo.ts";

export function makeCountCodigo() {
  const repositories = new TarefasDrizzleRepository()
  const makeContagemSetor = new ContagemCodigo(repositories)

  return makeContagemSetor
}