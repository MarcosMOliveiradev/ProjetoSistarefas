import { Presenca } from '../../application/entities/presenca.ts'
import { statusPresencaEnum, type statusPresencaEnum as StatusPresenca } from '../../application/entities/Roles.ts'
import { PresencaRepository } from '../../application/repositories/PresencaRepository.ts'

export class PresencaInMemoryRepository extends PresencaRepository {
  public items: Presenca[] = []
  async create(item: Presenca): Promise<void> { this.items.push(item) }
  async findPresencaId(id: string): Promise<Presenca> { return this.items.find(item => item.id === id) as Presenca }
  async findByUserAndDate(userId: string, date: Date): Promise<Presenca | null> { return this.items.find(item => item.userId === userId && item.data.toDateString() === date.toDateString()) ?? null }
  async findByUserAndPeriod(userId: string, inicio: Date, fim: Date): Promise<Presenca[]> { return this.items.filter(item => item.userId === userId && item.data >= inicio && item.data <= fim) }
  async updateStatus(id: string, status: StatusPresenca): Promise<void> {
    const item = this.items.find(p => p.id === id)
    if (item && item.status !== status) this.items[this.items.indexOf(item)] = (await import('../../application/entities/presenca.ts')).Presenca.restore({ id, userId: item.userId, data: item.data, tipoEsperado: item.tipoEsperado, origem: item.origem, status, horaEntrada: item.horaEntrada })
  }
  async updateHoraEntrada(id: string, hora: string): Promise<void> {
    const item = this.items.find(p => p.id === id)
    if (item) this.items[this.items.indexOf(item)] = (await import('../../application/entities/presenca.ts')).Presenca.restore({ id, userId: item.userId, data: item.data, tipoEsperado: item.tipoEsperado, origem: item.origem, status: item.status, horaEntrada: hora })
  }
  async findByPendente(status: StatusPresenca, inicio: Date, fim: Date): Promise<Presenca[]> { return this.items.filter(item => item.status === status && item.data >= inicio && item.data <= fim) }
  async findPresencauser(userId: string): Promise<Presenca[]> { return this.items.filter(item => item.userId === userId) }
  async findResumoMesal(userId: string, mes: number, ano: number): Promise<Presenca[]> { return this.items.filter(item => item.userId === userId && item.data.getMonth()+1 === mes && item.data.getFullYear() === ano) }
  async updatePresenca(): Promise<void> {
    this.items = this.items.map(item => item.status === statusPresencaEnum.PENDENTE
      ? Presenca.restore({ id: item.id, userId: item.userId, data: item.data, tipoEsperado: item.tipoEsperado, origem: item.origem, status: statusPresencaEnum.PRESENTE, horaEntrada: item.horaEntrada })
      : item)
  }
  async countDiasCumpridos(userId: string, mes: number, ano: number): Promise<number> { return (await this.findResumoMesal(userId, mes, ano)).filter(item => ['PRESENTE','ATRASADO'].includes(item.status)).length }
}
