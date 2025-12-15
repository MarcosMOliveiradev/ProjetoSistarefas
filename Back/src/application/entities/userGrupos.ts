import { createId } from "@paralleldrive/cuid2";

export interface IUserGrupos {
  userId: string;
  grupoId: string;
  dataInicio: Date;
  dataFim?: Date | null;
}

export class UserGrupos {
  private props: IUserGrupos;
  private _id: string;

  constructor(props: IUserGrupos) {
    this.validarPeriodo(props.dataInicio, props.dataFim);

    this._id = createId();
    this.props = { ...props };
  }

  private validarPeriodo(dataInicio: Date, dataFim?: Date | null) {
    if (dataFim && dataFim < dataInicio) {
      throw new Error(
        "Data fim do vínculo não pode ser anterior à data início"
      );
    }
  }

  public get id() {
    return this._id;
  }

  public get userId() {
    return this.props.userId;
  }
  public set userId(userId: string) {
    this.props.userId = userId;
  }

  public get grupoId() {
    return this.props.grupoId;
  }
  public set grupoId(grupoId: string) {
    this.props.grupoId = grupoId;
  }

  public get dataInicio() {
    return this.props.dataInicio;
  }
  public set dataInicio(dataInicio: Date) {
    this.validarPeriodo(dataInicio, this.props.dataFim);
    this.props.dataInicio = dataInicio;
  }

  public get dataFim() {
    return this.props.dataFim;
  }
  public set dataFim(dataFim: Date | null | undefined) {
    this.validarPeriodo(this.props.dataInicio, dataFim);
    this.props.dataFim = dataFim;
  }
}