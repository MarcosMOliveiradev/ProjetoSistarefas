import { describe, expect, it } from 'vitest'
import { CreateFeedback } from './createFeedback.ts'
import { FeedbackInMemoryRepository } from '../../../database/inMemory/FeedbackInMemoryRepository.ts'
import { feedbackOptions } from '../../entities/Feedback.ts'

describe('CreateFeedback Use Case', () => {
  it('creates feedback with the default analyzing status', async () => {
    const repository = new FeedbackInMemoryRepository()
    await new CreateFeedback(repository).execute({ conteudo: 'Sugestão de melhoria', nome: 'Ana' })
    expect(repository.items[0]).toMatchObject({ conteudo: 'Sugestão de melhoria', nome: 'Ana', status: feedbackOptions.ANALIZANDO })
  })
})
