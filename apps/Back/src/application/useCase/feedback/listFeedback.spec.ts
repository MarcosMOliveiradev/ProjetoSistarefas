import { describe, expect, it } from 'vitest'
import { ListFeedback } from './listFeedback.ts'
import { FeedbackInMemoryRepository } from '../../../database/inMemory/FeedbackInMemoryRepository.ts'
import { Feedback, feedbackOptions } from '../../entities/Feedback.ts'
import { UnexisteFeedback } from './error/unexistFeedback.ts'

describe('ListFeedback Use Case', () => {
  it('returns the feedback for the requested identifier', async () => {
    const repository = new FeedbackInMemoryRepository()
    const item = new Feedback({ conteudo: 'Sugestão', status: feedbackOptions.ANALIZANDO })
    await repository.create(item)
    await expect(new ListFeedback(repository).execute({ id: item.id })).resolves.toMatchObject({ conteudo: 'Sugestão' })
  })
  it('reports when the feedback does not exist', async () => {
    await expect(new ListFeedback(new FeedbackInMemoryRepository()).execute({ id: 'missing' })).rejects.toBeInstanceOf(UnexisteFeedback)
  })
})
