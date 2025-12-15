import { createId } from "@paralleldrive/cuid2";
import { seloEnum } from "./Roles.ts";

export interface IAnaliseMensal {
  usuarioId: string;
  mes: number;     // 1 a 12
  ano: number;
  diasEsperados: number;
  diasCumpridos: number;
  geradoEm: Date;
}

export class AnalisesMensais {
  private props: IAnaliseMensal;
  private _id: string;
  private _percentual: number;
  private _selo: seloEnum;

  constructor(props: IAnaliseMensal) {
    this.validarMes(props.mes);
    this.validarDias(props.diasEsperados, props.diasCumpridos);

    this._id = createId();
    this.props = { ...props };

    this._percentual = this.calcularPercentual();
    this._selo = this.calcularSelo(this._percentual);
  }

  private validarMes(mes: number) {
    if (mes < 1 || mes > 12) {
      throw new Error("Mês inválido");
    }
  }

  private validarDias(esperados: number, cumpridos: number) {
    if (esperados <= 0) {
      throw new Error("Dias esperados deve ser maior que zero");
    }
    if (cumpridos < 0 || cumpridos > esperados) {
      throw new Error("Dias cumpridos inválidos");
    }
  }

  private calcularPercentual(): number {
    return Number(
      ((this.props.diasCumpridos / this.props.diasEsperados) * 100).toFixed(2)
    );
  }

  private calcularSelo(percentual: number): seloEnum {
    if (percentual === 100) return seloEnum.DOURADO;
    if (percentual >= 76) return seloEnum.VERDE;
    return seloEnum.VERMELHO;
  }

  public get id() {
    return this._id;
  }

  public get usuarioId() {
    return this.props.usuarioId;
  }

  public get mes() {
    return this.props.mes;
  }

  public get ano() {
    return this.props.ano;
  }

  public get diasEsperados() {
    return this.props.diasEsperados;
  }

  public get diasCumpridos() {
    return this.props.diasCumpridos;
  }

  public get percentual() {
    return this._percentual;
  }

  public get selo() {
    return this._selo;
  }

  public get geradoEm() {
    return this.props.geradoEm;
  }
}