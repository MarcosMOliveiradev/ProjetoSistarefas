import { createId } from "@paralleldrive/cuid2";
import type { Replace } from "../../lib/Replace.ts";

export interface ITarefas {
  data: string;
  item: number;
  codAtividade: number;
  qtdFolha: number | null | undefined;
  idDocumento: string;
  hInicio: number;
  hTermino: number;
  nAtendimento: number;
  ativado: boolean;

  userId: string
  createdAt: Date;
  updatedAt?: Date | null;
}

export class Tarefas {
  private props: ITarefas;
  private _id: string;

  constructor(props: Replace<ITarefas, { createdAt?: Date }>) {
      this._id = createId()
      this.props = {
          ...props,
          createdAt: props.createdAt ?? new Date(),
      }
  }

  public get id() {
    return this._id;
  }

  public get data() {
    return this.props.data
  }
  public set data(data: string) {
    this.props.data = data
  }

  public get item() {
    return this.props.item
  }
  public set item(item: number) {
    this.props.item = item
  }

  public get codAtividade() {
    return this.props.codAtividade
  }
  public set codAtividade(codAtividade: number) {
    this.props.codAtividade = codAtividade
  }

  public get qtdFolha(): number | null | undefined {
    return this.props.qtdFolha
  }
  public set qtdFolha(qtdFolha: number | null | undefined) {
    if(!qtdFolha) {
      this.props.qtdFolha = 0
    } else {
      this.props.qtdFolha = qtdFolha
    }
  }

  public get idDocumento() {
    return this.props.idDocumento
  }
  public set idDocumento(idDocumento: string) {
    this.props.idDocumento = idDocumento
  }

  public get hInicio() {
    return this.props.hInicio
  }
  public set hInicio(hInicio: number) {
    this.props.hInicio = hInicio
  }

  public get hTermino() {
    return this.props.hTermino
  }
  public set hTermino(hTermino: number) {
    this.props.hTermino = hTermino
  }

  public get nAtendimento() {
    return this.props.nAtendimento
  }
  public set nAtendimento(nAtendimento: number) {
    this.props.nAtendimento = nAtendimento
  }

  public get ativado() {
    return this.props.ativado
  }
  public set ativado(ativado: boolean) {
    this.props.ativado = ativado
  }

  public get userId() {
    return this.props.userId
  }
  public set userId(userId: string) {
    this.props.userId = userId
  }

  public set updateAt(update: Date | null | undefined) {
    this.props.updatedAt = update
  }

  public get updateAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}