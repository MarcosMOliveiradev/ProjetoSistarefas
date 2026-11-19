import type { FeedbackDTO } from '../../DTOs/feedbackDTO.ts'
import type { Feedback, feedbackOptions } from '../../application/entities/Feedback.ts'
import { FeedbackRepository } from '../../application/repositories/FeedbackRepository.ts'

export class FeedbackInMemoryRepository extends FeedbackRepository {
  public items: Feedback[] = []
  async create(feedback: Feedback): Promise<void> { this.items.push(feedback) }
  private toDTO(item: Feedback): FeedbackDTO {
    return { id: item.id, conteudo: item.conteudo, status: item.status, nome: item.nome, createdAt: item.createdAt, updatedAt: item.updatedAt }
  }
  async findById(id: string): Promise<FeedbackDTO | null> {
    const item = this.items.find(feedback => feedback.id === id)
    return item ? this.toDTO(item) : null
  }
  async findAll(): Promise<FeedbackDTO[]> { return this.items.map(item => this.toDTO(item)) }
  async updateStatus(status: feedbackOptions, id: string): Promise<void> {
    const item = this.items.find(feedback => feedback.id === id)
    if (item) item.status = status
  }
}
