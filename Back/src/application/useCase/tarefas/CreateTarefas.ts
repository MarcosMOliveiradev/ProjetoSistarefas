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

  async exec({
    data,
    codAtividade,
    idDocumento,
    hInicioController,
    hTerminoController,
    item,
    nAtendimento,
    qtdFolha,
    userId
  }: ITarefas) {

    const atividade = await this.atividadeRepository.findForCod(codAtividade);

    if (!atividade) {
      throw new UnexistAtividade();
    }
    const documentos = idDocumento.split(" ").filter(Boolean);

    // Se qtdFolha tiver valores separados por espaço:
    const folhasArr = typeof qtdFolha === "string"
      ? qtdFolha.split(" ").map(Number)
      : [];

    const folhasFinal = documentos.map((_, i) =>
      folhasArr[i] ?? (typeof qtdFolha === "number" ? qtdFolha : null)
    );

    const inicioMin = await converterTimerInNumber(hInicioController);
    const fimMin = await converterTimerInNumber(hTerminoController);

    if(inicioMin === undefined || fimMin === undefined) {
      throw new Error("Horário de início ou término inválido")
    }

    const totalMin = fimMin - inicioMin;
    const quantidade = documentos.length;

    const minutosPorRegistro = Math.floor(totalMin / quantidade);

    let inicioAtual = inicioMin;

    const registrosCriados = [];
    let itemAtual = item;

    for (let i = 0; i < quantidade; i++) {
      const doc = documentos[i];
      const folhas = folhasFinal[i];

      const fimAtual = (i === quantidade - 1)
        ? fimMin // joga o resto no último
        : inicioAtual + minutosPorRegistro;

      const tarefa = new Tarefas({
        data,
        item: itemAtual,
        codAtividade,
        idDocumento: doc,
        qtdFolha: folhas,
        hInicio: inicioAtual,
        hTermino: fimAtual,
        nAtendimento,
        ativado: true,
        userId
      });

      const criado = await this.tarefasRepository.create(tarefa);
      registrosCriados.push(criado);

      inicioAtual = fimAtual;
      itemAtual++;
    }

    return registrosCriados;
  }
}