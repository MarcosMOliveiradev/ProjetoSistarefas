import { describe, expect, it } from 'vitest'
import { UpdateFeedbackStatus } from './updateFeedbackStatus.ts'
import { FeedbackInMemoryRepository } from '../../../database/inMemory/FeedbackInMemoryRepository.ts'
import { Feedback, feedbackOptions } from '../../entities/Feedback.ts'

describe('UpdateFeedbackStatus Use Case', () => {
  it('updates the status of the selected feedback', async () => {
    const repository = new FeedbackInMemoryRepository()
    const item = new Feedback({ conteudo: 'Sugestão', status: feedbackOptions.ANALIZANDO })
    await repository.create(item)
    await new UpdateFeedbackStatus(repository).execute({ id: item.id, status: feedbackOptions.CONCLUIDO })
    expect(item.status).toBe(feedbackOptions.CONCLUIDO)
  })
})
