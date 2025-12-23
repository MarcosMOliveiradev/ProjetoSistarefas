import { createId } from "@paralleldrive/cuid2";

export interface IUserGrupos {
  userId: string;
  grupoId: string;
  dataInicio: Date;
  dataFim?: Date | null;
}
export interface IUserGruposRestore extends IUserGrupos {
  id: string;
}

export class UserGrupos {
  private props: IUserGrupos;
  private _id: string;

  constructor(props: IUserGrupos) {
    this.validarPeriodo(props.dataInicio, props.dataFim);

    this._id = createId();
    this.props = { ...props };
  }

  static restore(props: IUserGruposRestore): UserGrupos {
    const obj = Object.create(UserGrupos.prototype) as UserGrupos;

    obj._id = props.id;
    obj.props = {
      userId: props.userId,
      grupoId: props.grupoId,
      dataInicio: props.dataInicio,
      dataFim: props.dataFim ?? null
    };

    return obj;
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

  public get grupoId() {
    return this.props.grupoId;
  }

  public get dataInicio() {
    return this.props.dataInicio;
  }

  public get dataFim() {
    return this.props.dataFim;
  }
}