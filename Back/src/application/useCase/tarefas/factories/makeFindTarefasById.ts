import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { FindTarefasById } from "../findTarefasById.ts";

export function makeFindTarefasById() {
  const repository = new TarefasDrizzleRepository()
  const findTarefa = new FindTarefasById(repository)

  return findTarefa
}