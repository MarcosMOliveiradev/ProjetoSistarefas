import type { Grupo } from '../../application/entities/grupo.ts'
import { GrupoRepository } from '../../application/repositories/GrupoRepository.ts'

export class GrupoInMemoryRepository extends GrupoRepository {
  public items: Grupo[] = []
  async create(grupo: Grupo): Promise<void> { this.items.push(grupo) }
  async findById(id: string): Promise<Grupo | null> { return this.items.find(item => item.id === id) ?? null }
  async findGrupById(id: string): Promise<Grupo | null> { return this.findById(id) }
  async find(): Promise<Grupo[]> { return this.items }
  async findAtivoByDate(date: Date): Promise<Grupo[]> {
    return this.items.filter(item => item.dataInicio <= date && (!item.dataFim || item.dataFim >= date))
  }
  async update(data: { name?: string; diasEmpresa?: number[]; diasInstituicao?: number[]; dataFim?: Date; id: string }): Promise<void> {
    const item = await this.findById(data.id)
    if (!item) return
    if (data.name !== undefined) item.nome = data.name
    if (data.diasEmpresa !== undefined) item.diasEmpresa = data.diasEmpresa
    if (data.diasInstituicao !== undefined) item.diasInstituicao = data.diasInstituicao
    if (data.dataFim !== undefined) item.dataFim = data.dataFim
  }
  async delete(id: string): Promise<void> { this.items = this.items.filter(item => item.id !== id) }
}
