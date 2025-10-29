import { Tarefas } from "../../entities/tarefa.ts";
import type { AtividadeRepository } from "../../repositories/AtividadeRepository.ts";
import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
import { UnexistAtividade } from "../atividade/error/unexistAtividade.ts";
import { converterTimerInNumber } from "./functions/converterTimerInNumber.ts";

export interface ITarefas {
  data: string;
  item: number;
  codAtividade: number;
  idDocumento: string;
  qtdFolha: number | null | undefined;
  hInicioController: string;
  hTerminoController: string;
  nAtendimento: number;

  userId: string
}

export class CreateTarefas {
  constructor(
    private tarefasRepository: TarefasRepository,
    private atividadeRepository: AtividadeRepository
  ) {}

  async exec({data, codAtividade, idDocumento, hInicioController, hTerminoController, item, nAtendimento, qtdFolha, userId }: ITarefas) {
    const atividade = this.atividadeRepository.findForCod(codAtividade)

    if(!atividade) {
      throw new UnexistAtividade()
    }

    // Converter as horas em em minutos
    const hInicio = await converterTimerInNumber(hInicioController)
    const hTermino = await converterTimerInNumber(hTerminoController)

    const tarefas = new Tarefas({
      data,
      item,
      codAtividade,
      idDocumento,
      qtdFolha,
      hInicio,
      hTermino,
      nAtendimento,
      ativado: true,
      userId
    })

    const criado = await this.tarefasRepository.create(tarefas)

    return criado
  }
}