import { randomUUID } from 'crypto'
import { Replace } from '../../../helpers/Replace'

interface IActivy {
  index_atividade_tarefa: number
  id_documento?: string
  quantidade_de_folha?: string
  hora_inicio: string
  hora_termino: string
  data: string
  created_at: Date

  usuario: string
  task: string
}

export class Activy {
  private _id: string
  private props: IActivy

  constructor(props: Replace<IActivy, { created_at?: Date }>) {
    this._id = randomUUID()
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set index_atividade_tarefa(index_atividade_tarefa: number) {
    this.props.index_atividade_tarefa = index_atividade_tarefa
  }

  public get index_atividade_tarefa() {
    return this.props.index_atividade_tarefa
  }

  public set id_documento(id_documento: string) {
    this.props.id_documento = id_documento
  }

  public get id_documento(): string | undefined {
    return this.props.id_documento
  }

  public set quantidade_de_folha(quantidade_de_folha: string) {
    this.props.quantidade_de_folha = quantidade_de_folha
  }

  public get quantidade_de_folha(): string | undefined {
    return this.props.quantidade_de_folha
  }

  public set hora_inicio(hora_inicio: string) {
    this.props.hora_inicio = hora_inicio
  }

  public get hora_inicio() {
    return this.props.hora_inicio
  }

  public set hora_termino(hora_termino: string) {
    this.props.hora_termino = hora_termino
  }

  public get hora_termino() {
    return this.props.hora_termino
  }

  public set data(data: string) {
    this.props.data = data
  }

  public get data() {
    return this.props.data
  }

  public set usuario(usuario: string) {
    this.props.usuario = usuario
  }

  public get usuario() {
    return this.props.usuario
  }

  public set task(task: string) {
    this.props.task = task
  }

  public get task() {
    return this.props.task
  }

  public get created(): Date {
    return this.props.created_at
  }
}
