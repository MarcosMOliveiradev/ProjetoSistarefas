import type { Replace } from "../../lib/Replace.ts"

export interface IAtividade {

  cod_atividade: number
  setor: string
  descricao: string
  tempoMedio: number
  ativado: boolean;
  userId: string
  createdAt: Date;
  updatedAt?: Date | null;

}
export class Atividade {
  private props: IAtividade

  constructor(props: Replace<IAtividade, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public set cod_atividade(cod_atividade: number) {
    this.props.cod_atividade = cod_atividade
  }
  public get cod_atividade() {
    return this.props.cod_atividade
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

  public set tempoMedio(tempoMedio: number) {
    this.props.tempoMedio = tempoMedio
  }
  public get tempoMedio() {
    return this.props.tempoMedio
  }

  public set ativado(ativado: boolean) {
      this.props.ativado = ativado
  }
  public get ativado() {
      return this.props.ativado
  }

  public set userId(userId: string) {
    this.props.userId = userId
  }
  public get userId() {
    return this.props.userId
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null | undefined {
    return this.props.updatedAt;
  }
  public set updatedAt(update: Date | null | undefined) {
    this.props.updatedAt = update;
  }
  
}