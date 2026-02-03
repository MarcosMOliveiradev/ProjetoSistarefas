import { AnalisesMensais } from "../../entities/analisesMensais.ts";
import type { AnaliseMensalRepository } from "../../repositories/AnaliseMensalRepository.ts";
import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";
import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts";
import { calcularDiasEsperados } from "./function/calcularDiasEsperados.ts";

interface IGeraAnaliseMensalRequest {
  userId: string;
  mes: number;
  ano: number;
}

export class CreateAnalise {
  constructor(
    private userGrupoRepository: UserGrupoRepository,
    private grupoRepository: GrupoRepository,
    private analiseMensalRepository: AnaliseMensalRepository,
    private presencaRepository: PresencaRepository
  ) {}

    async execute({ userId, mes, ano }: IGeraAnaliseMensalRequest) {
    const analiseExistente =
      await this.analiseMensalRepository.findByUserAndPeriod(userId, mes, ano)

    if (analiseExistente) {
      throw new Error("Análise mensal já existe para este usuário e período.")
    }

    const presencas =
      await this.presencaRepository.findResumoMesal(userId, mes, ano)

    if (!presencas || presencas.length === 0) {
      throw new Error("Nenhum registro de presença encontrado.")
    }

    // ✅ atrasos
    const atrasos = presencas.filter(p =>
      p.status === "ATRASADO"
    ).length

    // ✅ grupo ativo
    const grupoUser =
      await this.userGrupoRepository.findGrupoAtivoDoUsuario(userId)

    if (!grupoUser) {
      throw new Error("Usuário não está associado a nenhum grupo ativo.")
    }

    const grupo =
      await this.grupoRepository.findById(grupoUser.grupoId)

    if (!grupo) {
      throw new Error("Grupo associado ao usuário não encontrado.")
    }

    // ✅ dias esperados separados
    const diasEsperados = calcularDiasEsperados(grupo, mes, ano)

    const diasEsperadosEmpresa = diasEsperados.diasEmpresa
    const diasEsperadosInstituicao = diasEsperados.diasInstituicao

    // ✅ dias cumpridos separados
    const diasCumpridosEmpresa = presencas.filter(p =>
      p.tipoEsperado === "EMPRESA" &&
      (p.status === "PRESENTE" || p.status === "ATRASADO")
    ).length

    const diasCumpridosInstituicao = presencas.filter(p =>
      p.tipoEsperado === "INSTITUICAO" &&
      (p.status === "PRESENTE" || p.status === "ATRASADO")
    ).length

    // ✅ criar análise nova
    const analise = new AnalisesMensais({
    usuarioId: userId,
    mes,
    ano,

    diasEsperadosEmpresa: diasEsperados.diasEmpresa,
    diasEsperadosInstituicao: diasEsperados.diasInstituicao,

    diasCumpridosEmpresa: diasCumpridosEmpresa,
    diasCumpridosInstituicao: diasCumpridosInstituicao,

    atrasos: atrasos,

    geradoEm: new Date(),
  })

    await this.analiseMensalRepository.create(analise)
  }
}
