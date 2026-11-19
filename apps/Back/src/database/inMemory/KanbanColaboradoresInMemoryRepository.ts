import type { KanbanColaborador } from '../../application/entities/kanbanColaboradores.ts'
import { KanbanColaboradoresRepository } from '../../application/repositories/KanbanColaboradoresRepository.ts'

export class KanbanColaboradoresInMemoryRepository extends KanbanColaboradoresRepository {
  public items: { kanbanId: string; userId: string }[] = []
  async add(kanbanId: string, userId: string): Promise<void> {
    if (!this.items.some(item => item.kanbanId === kanbanId && item.userId === userId)) this.items.push({ kanbanId, userId })
  }
  async remove(kanbanId: string, userId: string): Promise<void> {
    this.items = this.items.filter(item => item.kanbanId !== kanbanId || item.userId !== userId)
  }
  async listByKanbanId(kanbanId: string): Promise<KanbanColaborador[]> {
    return this.items.filter(item => item.kanbanId === kanbanId) as unknown as KanbanColaborador[]
  }
}
