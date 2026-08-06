import { createId } from "@paralleldrive/cuid2";

export interface IGrupo {
  nome: string;

  // 0 = Domingo ... 6 = Sábado
  diasEmpresa: number[];       
  diasInstituicao: number[];   

  dataInicio: Date;
  dataFim?: Date | null;
}

export interface IUserRestore extends IGrupo {
  id: string;
}

export class Grupo {
  private props: IGrupo;
  private _id: string;

  constructor(props: IGrupo) {
    this.validarDias(props.diasEmpresa);
    this.validarDias(props.diasInstituicao);

    this.validarDiasObrigatorios(
      props.diasEmpresa,
      props.diasInstituicao
    );

    this.validarSobreposicao(
      props.diasEmpresa,
      props.diasInstituicao
    );

    this.validarPeriodo(props.dataInicio, props.dataFim);

    this._id = createId();
    this.props = { ...props };
  }

  // ------------------------------
  // 🔄 Restore (hidratar do banco)
  // ------------------------------
  static restore(props: IUserRestore) {
    const obj = Object.create(Grupo.prototype) as Grupo;

    obj._id = props.id;
    obj.props = {
      nome: props.nome,
      diasEmpresa: props.diasEmpresa,
      diasInstituicao: props.diasInstituicao,
      dataInicio: props.dataInicio,
      dataFim: props.dataFim ?? null,
    };

    return obj;
  }

  // ------------------------------
  // ✅ Validações
  // ------------------------------

  private validarDias(dias: number[]) {
    dias.forEach((dia) => {
      if (dia < 0 || dia > 6) {
        throw new Error(
          "Dia da semana inválido (use 0 = Domingo até 6 = Sábado)"
        );
      }
    });
  }

  private validarDiasObrigatorios(
    diasEmpresa: number[],
    diasInstituicao: number[]
  ) {
    if (diasEmpresa.length === 0 && diasInstituicao.length === 0) {
      throw new Error(
        "O grupo deve possuir ao menos um dia de empresa ou instituição"
      );
    }
  }

  private validarSobreposicao(
    diasEmpresa: number[],
    diasInstituicao: number[]
  ) {
    // permitido se um dos dois estiver vazio
    if (diasEmpresa.length === 0 || diasInstituicao.length === 0) {
      return;
    }

    const intersecao = diasEmpresa.filter((dia) =>
      diasInstituicao.includes(dia)
    );

    if (intersecao.length > 0) {
      throw new Error(
        "Dias de empresa e instituição não podem se sobrepor"
      );
    }
  }

  private validarPeriodo(dataInicio: Date, dataFim?: Date | null) {
    if (dataFim && dataFim < dataInicio) {
      throw new Error(
        "Data fim não pode ser anterior à data início"
      );
    }
  }

  // ------------------------------
  // 🔓 Getters / Setters
  // ------------------------------

  public get id() {
    return this._id;
  }

  public get nome() {
    return this.props.nome;
  }
  public set nome(nome: string) {
    this.props.nome = nome;
  }

  // ---- Empresa
  public get diasEmpresa() {
    return this.props.diasEmpresa;
  }
  public set diasEmpresa(diasEmpresa: number[]) {
    this.validarDias(diasEmpresa);

    this.validarDiasObrigatorios(
      diasEmpresa,
      this.props.diasInstituicao
    );

    this.validarSobreposicao(
      diasEmpresa,
      this.props.diasInstituicao
    );

    this.props.diasEmpresa = diasEmpresa;
  }

  // ---- Instituição
  public get diasInstituicao() {
    return this.props.diasInstituicao;
  }
  public set diasInstituicao(diasInstituicao: number[]) {
    this.validarDias(diasInstituicao);

    this.validarDiasObrigatorios(
      this.props.diasEmpresa,
      diasInstituicao
    );

    this.validarSobreposicao(
      this.props.diasEmpresa,
      diasInstituicao
    );

    this.props.diasInstituicao = diasInstituicao;
  }

  // ---- Período
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
    this.props.dataFim = dataFim ?? null;
  }

  // ------------------------------
  // 🧠 Regras de negócio úteis
  // ------------------------------

  public isDiaEmpresa(diaSemana: number): boolean {
    return this.props.diasEmpresa.includes(diaSemana);
  }

  public isDiaInstituicao(diaSemana: number): boolean {
    return this.props.diasInstituicao.includes(diaSemana);
  }

  public isSomenteEmpresa(): boolean {
    return (
      this.props.diasEmpresa.length > 0 &&
      this.props.diasInstituicao.length === 0
    );
  }

  public isSomenteInstituicao(): boolean {
    return (
      this.props.diasInstituicao.length > 0 &&
      this.props.diasEmpresa.length === 0
    );
  }

  public isMisto(): boolean {
    return (
      this.props.diasEmpresa.length > 0 &&
      this.props.diasInstituicao.length > 0
    );
  }
}