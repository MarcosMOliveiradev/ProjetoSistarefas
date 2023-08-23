import { randomUUID } from 'node:crypto'
import { Replace } from '../../../helpers/Replace'

interface ITask {
  codigo: number
  setor: string
  descricao: string
  created_at: Date

  usuario: string
}

export class Task {
  private _id: string
  private props: ITask

  constructor(props: Replace<ITask, { created_at?: Date }>) {
    this._id = randomUUID()
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set codigo(codigo: number) {
    this.props.codigo = codigo
  }

  public get codigo() {
    return this.props.codigo
  }

  public set setor(setor: string) {
    this.props.setor = setor
  }

  public get setor() {
    return this.props.setor
  }

  public set descricao(descricao: string) {
    this.props.descricao = descricao
  }

  public get descricao() {
    return this.props.descricao
  }

  public set user(user: string) {
    this.props.usuario = user
  }

  public get user() {
    return this.props.usuario
  }

  public get created(): Date {
    return this.props.created_at
  }
}
