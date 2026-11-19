import { describe, expect, it } from 'vitest'
import { ListFeedbacks } from './listFeedbacks.ts'
import { FeedbackInMemoryRepository } from '../../../database/inMemory/FeedbackInMemoryRepository.ts'
import { Feedback, feedbackOptions } from '../../entities/Feedback.ts'

describe('ListFeedbacks Use Case', () => {
  it('returns every saved feedback item', async () => {
    const repository = new FeedbackInMemoryRepository()
    await repository.create(new Feedback({ conteudo: 'Um', status: feedbackOptions.ANALIZANDO }))
    await repository.create(new Feedback({ conteudo: 'Dois', status: feedbackOptions.ANALIZANDO }))
    await expect(new ListFeedbacks(repository).execute()).resolves.toHaveLength(2)
  })
})
