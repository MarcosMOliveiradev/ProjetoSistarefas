import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
import { converterNumberInTimer } from "./functions/converterNumberInTimer.ts";

interface ITarefasDetalhe {
  data: string,
  userId: string
}

export class ListaTarefas {
  constructor(private repository: TarefasRepository) {}

  async exec({ data, userId }: ITarefasDetalhe) {
    const tarefas = await this.repository.listTarefas(data, userId)


    const tarefasConvertidas = await Promise.all(
      tarefas.map(async (item: any) => {
        const h_inicio = item.tarefas.h_inicio
        const h_termino = item.tarefas.h_termino

        return {
          ...item,
          tarefas: {
            ...item.tarefas,
            h_inicio: await converterNumberInTimer(h_inicio),
            h_termino: await converterNumberInTimer(h_termino),
          }
        }
      })
    )


    return tarefasConvertidas
  }
}