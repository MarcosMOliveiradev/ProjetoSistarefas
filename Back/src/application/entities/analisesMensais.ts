import { createId } from "@paralleldrive/cuid2";
import { seloEnum } from "./Roles.ts";

export interface IAnaliseMensal {
  usuarioId: string;

  mes: number;
  ano: number;

  diasEsperadosEmpresa: number;
  diasEsperadosInstituicao: number;

  diasCumpridosEmpresa: number;
  diasCumpridosInstituicao: number;

  atrasos: number;

  geradoEm: Date;
}

export class AnalisesMensais {
  private props: IAnaliseMensal
  private _id: string

  private _percentualEmpresa: number
  private _percentualInstituicao: number
  private _selo: seloEnum

  constructor(props: IAnaliseMensal) {
    this.validarMes(props.mes)

    this.validarDias(
      props.diasEsperadosEmpresa,
      props.diasCumpridosEmpresa,
      "Empresa"
    )

    this.validarDias(
      props.diasEsperadosInstituicao,
      props.diasCumpridosInstituicao,
      "Instituição"
    )

    this.validarAtrasos(props.atrasos)

    this._id = createId()
    this.props = { ...props }

    // percentuais separados
    this._percentualEmpresa = this.calcularPercentual(
      props.diasCumpridosEmpresa,
      props.diasEsperadosEmpresa
    )

    this._percentualInstituicao = this.calcularPercentual(
      props.diasCumpridosInstituicao,
      props.diasEsperadosInstituicao
    )

    // selo global
    this._selo = this.calcularSelo()
  }

  // ------------------------------
  // ✅ Validações
  // ------------------------------

  private validarMes(mes: number) {
    if (mes < 1 || mes > 12) {
      throw new Error("Mês inválido")
    }
  }

  private validarDias(
    esperados: number,
    cumpridos: number,
    tipo: string
  ) {
    if (esperados < 0) {
      throw new Error(`Dias esperados (${tipo}) não pode ser negativo`)
    }

    if (cumpridos < 0) {
      throw new Error(`Dias cumpridos (${tipo}) não pode ser negativo`)
    }

    if (cumpridos > esperados) {
      throw new Error(
        `Dias cumpridos (${tipo}) não pode ser maior que dias esperados`
      )
    }
  }

  private validarAtrasos(atrasos: number) {
    if (atrasos < 0) {
      throw new Error("Atrasos não pode ser negativo")
    }
  }

  // ------------------------------
  // ✅ Cálculos
  // ------------------------------

  private calcularPercentual(cumpridos: number, esperados: number): number {
    if (esperados === 0) return 0

    return Number(((cumpridos / esperados) * 100).toFixed(2))
  }

  private calcularPercentualGlobal(): number {
    const totalEsperado =
      this.props.diasEsperadosEmpresa +
      this.props.diasEsperadosInstituicao

    const totalCumprido =
      this.props.diasCumpridosEmpresa +
      this.props.diasCumpridosInstituicao

    return this.calcularPercentual(totalCumprido, totalEsperado)
  }

  private calcularSelo(): seloEnum {
    const percentualGlobal = this.calcularPercentualGlobal()

    // percentuais separados
    const empresa = this._percentualEmpresa
    const instituicao = this._percentualInstituicao

    // 🔴 Regra nova:
    // se qualquer um dos dois ficar em 75% ou menos → vermelho direto
    if (empresa <= 75 || instituicao <= 75) {
      return seloEnum.VERMELHO
    }

    // 🟡 dourado = 100% em tudo e sem atrasos
    if (
      percentualGlobal === 100 &&
      empresa === 100 &&
      instituicao === 100 &&
      this.props.atrasos === 0
    ) {
      return seloEnum.DOURADO
    }

    // 🟢 verde = acima de 75% em ambos
    if (percentualGlobal >= 76) {
      return seloEnum.VERDE
    }

    // fallback
    return seloEnum.VERMELHO
  }

  // ------------------------------
  // ✅ Getters públicos
  // ------------------------------

  public get id() {
    return this._id
  }

  public get usuarioId() {
    return this.props.usuarioId
  }

  public get mes() {
    return this.props.mes
  }

  public get ano() {
    return this.props.ano
  }

  // ---- Empresa

  public get diasEsperadosEmpresa() {
    return this.props.diasEsperadosEmpresa
  }

  public get diasCumpridosEmpresa() {
    return this.props.diasCumpridosEmpresa
  }

  public get percentualEmpresa() {
    return this._percentualEmpresa
  }

  // ---- Instituição

  public get diasEsperadosInstituicao() {
    return this.props.diasEsperadosInstituicao
  }

  public get diasCumpridosInstituicao() {
    return this.props.diasCumpridosInstituicao
  }

  public get percentualInstituicao() {
    return this._percentualInstituicao
  }

  // ---- Atrasos

  public get atrasos() {
    return this.props.atrasos
  }

  // ---- Global

  public get selo() {
    return this._selo
  }

  public get geradoEm() {
    return this.props.geradoEm
  }
}