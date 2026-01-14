import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
import { converterNumberInTimer } from "./functions/converterNumberInTimer.ts";
export enum SearchType {
  id_documento = "id_documento",
  cod_atividade = "cod_atividade",
  n_atendimento = "n_atendimento",
  data = "data"
}
interface ISearchTarefasRequest {
  type: SearchType;
  value: string | number
  userId?: string
}

export class SearchTarefas {
  constructor(private tarefasRepository: TarefasRepository) {}

  async execute({type, value, userId }: ISearchTarefasRequest) {
    let convetedValue

    if(type === SearchType.cod_atividade || type === SearchType.n_atendimento) {
      convetedValue = Number(value)
    } else {
      convetedValue = value
    }

    const tarefas = await this.tarefasRepository.searchTarefasByType(type, convetedValue, userId)

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