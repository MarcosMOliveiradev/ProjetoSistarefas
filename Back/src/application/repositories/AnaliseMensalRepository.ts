import type { AnalisesMensais } from "../entities/analisesMensais.ts";

export abstract class AnaliseMensalRepository {
  abstract create(analise: AnalisesMensais): Promise<void>
  abstract findByUserAndPeriod(userId: string, mes: number, ano: number): Promise<AnalisesMensais | null>
  abstract findHistoricoUsuario(userId: string): Promise<AnalisesMensais[]>
  abstract findAnaliseComAtrasos(usuarioId: string, mes: number, ano: number): Promise<AnalisesMensais>
}