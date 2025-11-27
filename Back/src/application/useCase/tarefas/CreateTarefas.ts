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

    const documentos = idDocumento.split(" ").filter(Boolean)

    const folhasArray = String(qtdFolha ?? "").split(" ").filter(Boolean)
    const atendimentosArray = String(nAtendimento ?? "").split(" ").filter(Boolean)

    const total = documentos.length

    // Validação apenas quando há múltiplos valores
    if (folhasArray.length > 1 && folhasArray.length !== total) {
      throw new Error("Quantidade de valores de folhas não corresponde ao número de documentos")
    }

    if (atendimentosArray.length > 1 && atendimentosArray.length !== total) {
      throw new Error("Quantidade de valores de atendimentos não corresponde ao número de documentos")
    }

    let itemAtual = item
    const registrosCriados = []

    for (let i = 0; i < total; i++) {
      const tarefas = new Tarefas({
        data,
        item: itemAtual,
        codAtividade,
        idDocumento: documentos[i],
        qtdFolha: folhasArray.length === 1 
          ? Number(folhasArray[0]) 
          : Number(folhasArray[i]),
        hInicio,
        hTermino,
        nAtendimento: atendimentosArray.length === 1
          ? Number(atendimentosArray[0])
          : Number(atendimentosArray[i]),
        ativado: true,
        userId
      })

      const criado = await this.tarefasRepository.create(tarefas)
      registrosCriados.push(criado)
      itemAtual++
    }

    return registrosCriados
  }
}