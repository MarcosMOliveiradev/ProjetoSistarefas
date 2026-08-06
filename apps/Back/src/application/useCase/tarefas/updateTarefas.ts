import { Tarefas } from "../../entities/tarefa.ts";
import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
import { converterTimerInNumber } from "./functions/converterTimerInNumber.ts";

export interface IUpdataTarefas {
  id: string
  data?: string;
  item?: number;
  codAtividade?: number;
  qtdFolha?: number;
  idDocumento?: string;
  hInicioController?: string | null;
  hTerminoController?: string | null;
  nAtendimento?: number;
}

export class UpdateTarefas {
  constructor(private tarefasRepository: TarefasRepository) {}

  async execute(dados: IUpdataTarefas, userId: string) {
    const tarefa = await this.tarefasRepository.findById(dados.id)

    if (!tarefa) {
      throw new Error("Tarefa não encontrada")
    }

    if (userId !== tarefa.tarefas.usuarioId) {
      throw new Error("Usuário não autorizado")
    }

    const h_inicio =
      dados.hInicioController !== undefined
        ? await converterTimerInNumber(dados.hInicioController)
        : tarefa.tarefas.h_inicio

    const h_termino =
      dados.hTerminoController !== undefined
        ? await converterTimerInNumber(dados.hTerminoController)
        : tarefa.tarefas.h_termino

    await this.tarefasRepository.updateTarefa({
      id: dados.id,
      data: dados.data,
      codAtividade: dados.codAtividade,
      item: dados.item,
      h_inicio,
      h_termino,
      idDocumento: dados.idDocumento,
      nAtendimento: dados.nAtendimento,
      qtdFolha: dados.qtdFolha,
    })
  }
}