import type { AnalisesMensais } from '../../application/entities/analisesMensais.ts'
import { AnaliseMensalRepository } from '../../application/repositories/AnaliseMensalRepository.ts'

export class AnaliseMensalInMemoryRepository extends AnaliseMensalRepository {
  public items: AnalisesMensais[] = []
  async create(item: AnalisesMensais): Promise<void> { this.items.push(item) }
  async findByUserAndPeriod(userId: string, mes: number, ano: number): Promise<AnalisesMensais | null> { return this.items.find(item => item.usuarioId === userId && item.mes === mes && item.ano === ano) ?? null }
  async findHistoricoUsuario(userId: string): Promise<AnalisesMensais[]> { return this.items.filter(item => item.usuarioId === userId) }
  async findAnaliseComAtrasos(userId: string, mes: number, ano: number): Promise<AnalisesMensais> { return (await this.findByUserAndPeriod(userId, mes, ano)) as AnalisesMensais }
  async countAnalise(userId: string): Promise<{ total: number; mesAtual: boolean }> {
    const items = this.items.filter(item => item.usuarioId === userId)
    const now = new Date()
    return { total: items.length, mesAtual: items.some(item => item.mes === now.getMonth()+1 && item.ano === now.getFullYear()) }
  }
  async findAnaliseForPeriod(mes: number, ano: number): Promise<AnalisesMensais[]> { return this.items.filter(item => item.mes === mes && item.ano === ano) }
}
