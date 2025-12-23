import { createId } from "@paralleldrive/cuid2";

export interface IGrupo {
  nome: string;
  diasEmpresa: number[];      // 0 = Domingo ... 6 = Sábado
  diasInstituicao: number[];
  dataInicio: Date;
  dataFim?: Date | null;
}

export interface IUserRestore extends IGrupo {
  id: string
}

export class Grupo {
  private props: IGrupo;
  private _id: string;

  constructor(props: IGrupo) {
    this.validarDias(props.diasEmpresa);
    this.validarDias(props.diasInstituicao);
    this.validarSobreposicao(props.diasEmpresa, props.diasInstituicao);
    this.validarPeriodo(props.dataInicio, props.dataFim);

    this._id = createId();
    this.props = { ...props };
  }

  static restore(props: IUserRestore) {
    const obj = Object.create(Grupo.prototype) as Grupo;

    obj._id = props.id;
    obj.props = {
      nome: props.nome,
      dataInicio: props.dataInicio,
      diasEmpresa: props.diasEmpresa,
      diasInstituicao: props.diasInstituicao,
      dataFim: props.dataFim
    };

    return obj
  }

  private validarDias(dias: number[]) {
    dias.forEach((dia) => {
      if (dia < 0 || dia > 6) {
        throw new Error("Dia da semana inválido (use 0 a 6)");
      }
    });
  }

  private validarSobreposicao(
    diasEmpresa: number[],
    diasInstituicao: number[]
  ) {
    const intersecao = diasEmpresa.filter((d) =>
      diasInstituicao.includes(d)
    );

    if (intersecao.length > 0) {
      throw new Error(
        "Dias de empresa e instituição não podem se sobrepor"
      );
    }
  }

  private validarPeriodo(dataInicio: Date, dataFim?: Date | null) {
    if (dataFim && dataFim < dataInicio) {
      throw new Error("Data fim não pode ser anterior à data início");
    }
  }
  
  public get id() {
    return this._id;
  }

  public get nome() {
    return this.props.nome;
  }
  public set nome(nome: string) {
    this.props.nome = nome;
  }

  public get diasEmpresa() {
    return this.props.diasEmpresa;
  }
  public set diasEmpresa(diasEmpresa: number[]) {
    this.validarDias(diasEmpresa);
    this.validarSobreposicao(diasEmpresa, this.props.diasInstituicao);
    this.props.diasEmpresa = diasEmpresa;
  }

  public get diasInstituicao() {
    return this.props.diasInstituicao;
  }
  public set diasInstituicao(diasInstituicao: number[]) {
    this.validarDias(diasInstituicao);
    this.validarSobreposicao(this.props.diasEmpresa, diasInstituicao);
    this.props.diasInstituicao = diasInstituicao;
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
  
  public isDiaEmpresa(diaSemana: number): boolean {
    return this.props.diasEmpresa.includes(diaSemana)
  }

  public isDiaInstituicao(diaSemana: number): boolean {
    return this.props.diasInstituicao.includes(diaSemana)
  }
}