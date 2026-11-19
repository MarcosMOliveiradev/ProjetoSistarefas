import type { UserGrupos } from '../../application/entities/userGrupos.ts'
import { UserGrupoRepository } from '../../application/repositories/UserGrupoRepository.ts'

export class UserGrupoInMemoryRepository extends UserGrupoRepository {
  public items: UserGrupos[] = []
  async vincular(vinculo: UserGrupos): Promise<void> { this.items.push(vinculo) }
  async findGrupoAtivoDoUsuario(userId: string): Promise<UserGrupos | null> {
    return this.items.filter(item => item.userId === userId && !item.dataFim).sort((a,b) => b.dataInicio.getTime()-a.dataInicio.getTime())[0] ?? null
  }
  async findGrupoAtivo(userId: string, date: Date): Promise<UserGrupos | null> {
    return this.items.find(item => item.userId === userId && item.dataInicio <= date && (!item.dataFim || item.dataFim >= date)) ?? null
  }
  async findHistoricoDoUsuario(userId: string): Promise<UserGrupos[]> { return this.items.filter(item => item.userId === userId) }
  async encerrarVinculo(id: string, dataFim: Date): Promise<void> {
    const item = this.items.find(vinculo => vinculo.id === id)
    if (item) this.items[this.items.indexOf(item)] = (await import('../../application/entities/userGrupos.ts')).UserGrupos.restore({ id, userId: item.userId, grupoId: item.grupoId, dataInicio: item.dataInicio, dataFim })
  }
  async findAtivosPorData(data: Date): Promise<UserGrupos[]> { return this.items.filter(item => item.dataInicio <= data && (!item.dataFim || item.dataFim >= data)) }
}
