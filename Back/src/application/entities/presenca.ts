import { createId } from "@paralleldrive/cuid2";
import {
  origemPresencaEnum,
  statusPresencaEnum,
  tipoEsperadoEnum,
} from "./Roles.ts";
import { converterTimerInNumber } from "../useCase/tarefas/functions/converterTimerInNumber.ts";

export interface IPresencaProps {
  userId: string;
  data: Date;
  tipoEsperado: tipoEsperadoEnum;
  origem: origemPresencaEnum;
}

export interface IPresencaRestore extends IPresencaProps {
  id: string;
  status: statusPresencaEnum;
  horaEntrada?: string | null;
}

export class Presenca {
  private props: {
    userId: string;
    data: Date;
    tipoEsperado: tipoEsperadoEnum;
    origem: origemPresencaEnum;
    status: statusPresencaEnum;
    horaEntrada: string | null;
  };

  private _id: string;

  constructor(props: IPresencaProps) {
    this._id = createId();
    this.props = {
      ...props,
      status: statusPresencaEnum.PENDENTE,
      horaEntrada: null,
    };
  }

  static restore(props: IPresencaRestore): Presenca {
    const presenca = Object.create(Presenca.prototype) as Presenca;

    presenca._id = props.id;
    presenca.props = {
      userId: props.userId,
      data: props.data,
      tipoEsperado: props.tipoEsperado,
      origem: props.origem,
      status: props.status,
      horaEntrada: props.horaEntrada ?? null,
    };

    return presenca;
  }

 public async  registrarEntrada(
  horaEntrada: string,
  horaLimite: string
) {
  const horaEntradanum = converterTimerInNumber(horaEntrada)
  const horaLimitenum = converterTimerInNumber(horaLimite)

  if (this.props.status !== statusPresencaEnum.PENDENTE) {
    return
  }

  if (this.props.horaEntrada) {
    return
  }

  this.props.horaEntrada = horaEntrada;

  if (horaEntradanum <= horaLimitenum) {
    this.props.status = statusPresencaEnum.PRESENTE;
  } else {
    console.log("ATRASADO")
    this.props.status = statusPresencaEnum.ATRASADO;
  }
}

  public marcarFalta() {
    if (this.props.status !== statusPresencaEnum.PENDENTE) {
      throw new Error("Apenas presenças pendentes podem virar falta");
    }

    this.props.status = statusPresencaEnum.FALTA;
  }

  public get id() {
    return this._id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get data() {
    return this.props.data;
  }

  public get tipoEsperado() {
    return this.props.tipoEsperado;
  }

  public get origem() {
    return this.props.origem;
  }

  public get status() {
    return this.props.status;
  }

  public get horaEntrada() {
    return this.props.horaEntrada;
  }
}