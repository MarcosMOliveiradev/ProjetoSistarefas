import { Tarefas } from "../../entities/tarefa.ts";
import type { IUpdataTarefas, TarefasRepository } from "../../repositories/TarefasRepository.ts";

export class UpdateTarefas {
  constructor (private tarefasRepository: TarefasRepository) {}

  async execute(dados: IUpdataTarefas) {
    const tarefas = await this.tarefasRepository.findById(dados.id)

    if(!tarefas || !tarefas.tarefas.cod_atividade || !tarefas.tarefas.usuarioId) {
      throw new Error("Tarefa não encontrada")
    }

    const update = new Tarefas({
      data: dados.data ? dados.data : tarefas.tarefas.data,
      codAtividade: dados.codAtividade ? dados.codAtividade : tarefas.tarefas.cod_atividade,
      item: dados.item ? dados.item : tarefas.tarefas.item,
      hInicio: dados.hInicio ? dados.hInicio : tarefas.tarefas.h_inicio,
      hTermino: dados.hTermino ? dados.hTermino: tarefas.tarefas.h_termino,
      idDocumento: dados.idDocumento ?? tarefas.tarefas.id_documento,
      nAtendimento: dados.nAtendimento ?? tarefas.tarefas.n_atendimento,
      qtdFolha: dados.qtdFolha ?? tarefas.tarefas.qtd_folha,
      ativado: true,
      userId: tarefas.tarefas.usuarioId,
    })

    await this.tarefasRepository.updateTarefa(update)
  }
}