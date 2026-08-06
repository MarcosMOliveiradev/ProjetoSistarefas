import { AnalisesMensais } from "../../entities/analisesMensais.ts";
import type { AnaliseMensalRepository } from "../../repositories/AnaliseMensalRepository.ts";
import type { GrupoRepository } from "../../repositories/GrupoRepository.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";
import type { UserGrupoRepository } from "../../repositories/UserGrupoRepository.ts";

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
    // 1. Verificar se já existe análise
    const analiseExistente =
      await this.analiseMensalRepository.findByUserAndPeriod(userId, mes, ano)

    if (analiseExistente) {
      throw new Error("Análise mensal já existe para este usuário e período.")
    }

    // 2. Buscar presenças do mês
    const presencas =
      await this.presencaRepository.findResumoMesal(userId, mes, ano)

    if (!presencas || presencas.length === 0) {
      throw new Error("Nenhum registro de presença encontrado.")
    }

    // 3. Contar atrasos
    const atrasos = presencas.filter(p =>
      p.status === "ATRASADO"
    ).length

    // 4. Calcular dias esperados REAIS (somente dias existentes no banco)
    const diasEsperadosEmpresa = presencas.filter(p =>
      p.tipoEsperado === "EMPRESA"
    ).length

    const diasEsperadosInstituicao = presencas.filter(p =>
      p.tipoEsperado === "INSTITUICAO"
    ).length

    // 5. Calcular dias cumpridos
    const diasCumpridosEmpresa = presencas.filter(p =>
      p.tipoEsperado === "EMPRESA" &&
      (p.status === "PRESENTE" || p.status === "ATRASADO")
    ).length

    const diasCumpridosInstituicao = presencas.filter(p =>
      p.tipoEsperado === "INSTITUICAO" &&
      (p.status === "PRESENTE" || p.status === "ATRASADO")
    ).length

    // 6. Criar análise mensal
    const analise = new AnalisesMensais({
      usuarioId: userId,
      mes,
      ano,

      diasEsperadosEmpresa,
      diasEsperadosInstituicao,

      diasCumpridosEmpresa,
      diasCumpridosInstituicao,

      atrasos,

      geradoEm: new Date(),
    })

    // 7. Salvar no banco
    await this.analiseMensalRepository.create(analise)
  }
}
