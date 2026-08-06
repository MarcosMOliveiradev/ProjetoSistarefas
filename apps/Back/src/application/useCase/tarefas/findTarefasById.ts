import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
import { converterNumberInTimer } from "./functions/converterNumberInTimer.ts";

export class FindTarefasById {
  constructor(private tarefasRepository: TarefasRepository) {}

  async execute(id: string) {
    const item = await this.tarefasRepository.findById(id)

    return {
    ...item,
    tarefas: {
      ...item.tarefas,
      h_inicio: await converterNumberInTimer(item.tarefas.h_inicio),
      h_termino: await converterNumberInTimer(item.tarefas.h_termino),
    }
  }
  }
}