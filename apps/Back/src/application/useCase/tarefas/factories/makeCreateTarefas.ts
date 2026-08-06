import { AtividadeDrizzleRepository } from "../../../../database/table/AtividadeDrizzleRepository.ts";
import { TarefasDrizzleRepository } from "../../../../database/table/TarefasDrizzleRepository.ts";
import { CreateTarefas } from "../CreateTarefas.ts";

export function makeCreateTarefas() {
  const tarefasRepository = new TarefasDrizzleRepository()
  const atividadeRepository = new AtividadeDrizzleRepository()

  const createTarefas = new CreateTarefas( tarefasRepository, atividadeRepository )

  return createTarefas
}