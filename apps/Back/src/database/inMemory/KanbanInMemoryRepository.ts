import type { Kanban } from '../../application/entities/kanban.ts'
import type { kanbanStatusEnum } from '../../application/entities/Roles.ts'
import { KanbanRepository } from '../../application/repositories/kanbanRepository.ts'

export class KanbanInMemoryRepository extends KanbanRepository {
  public items: Kanban[] = []
  async create(item: Kanban): Promise<void> { this.items.push(item) }
  async find(): Promise<Kanban[]> { return this.items }
  async findById(id: string): Promise<Kanban | null> { return this.items.find(item => item.id === id) ?? null }
  async findStatus(status: kanbanStatusEnum): Promise<Kanban[]> { return this.items.filter(item => item.status === status) }
  async updateDetails(id: string, data: { titulo?: string; descricao?: string; codAtividades?: number }): Promise<void> {
    const item = await this.findById(id)
    if (!item) return
    this.items[this.items.indexOf(item)] = (await import('../../application/entities/kanban.ts')).Kanban.restore({ ...item.toJSON(), ...data }, id)
  }
  async start(id: string, userId: string): Promise<void> { (await this.findById(id))?.start(userId) }
  async finish(id: string, userId: string): Promise<void> { (await this.findById(id))?.finish(userId) }
  async cancel(id: string, userId: string, motivo?: string | null): Promise<void> { (await this.findById(id))?.cancel(userId, motivo) }
  async delete(id: string): Promise<void> { this.items = this.items.filter(item => item.id !== id) }
}
