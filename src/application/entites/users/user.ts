import { randomUUID } from 'node:crypto'
import { Replace } from '../../../helpers/Replace'

export interface IUser {
  nome: string
  matricula: number
  password: string
  permissao: boolean
  created_at: Date
  update_at?: Date | null
}

export class User {
  private _id: string
  private props: IUser

  constructor(props: Replace<IUser, { created_at?: Date }>) {
    this._id = randomUUID()
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set nome(nome: string) {
    this.props.nome = nome
  }

  public get nome() {
    return this.props.nome
  }

  public set matricula(matricula: number) {
    this.props.matricula = matricula
  }

  public get matricula() {
    return this.props.matricula
  }

  public set password(password: string) {
    this.props.password = password
  }

  public get password() {
    return this.props.password
  }

  public set permissao(permissao: boolean | false) {
    this.props.permissao = permissao
  }

  public get permissao() {
    return this.props.permissao
  }

  public set update(update: Date | null | undefined) {
    this.props.update_at = update
  }

  public get update(): Date | null | undefined {
    return this.props.update_at
  }

  public get created(): Date {
    return this.props.created_at
  }
}
