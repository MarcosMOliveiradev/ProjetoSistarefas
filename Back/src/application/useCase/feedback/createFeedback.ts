import { Feedback, feedbackOptions } from "../../entities/Feedback.ts";
import type { FeedbackRepository } from "../../repositories/FeedbackRepository.ts";

interface IFeedbackRequest {
  conteudo: string
  statusBody?: feedbackOptions | null
  nome?: string | null;
}

export class CreateFeedback {
  constructor( private repository: FeedbackRepository ){}

  async execute({ conteudo, statusBody, nome }: IFeedbackRequest) {

    const status = statusBody ?? feedbackOptions.EM_ANDAMENTO

    const feedback = new Feedback({
      conteudo,
      status,
      nome
    })
    await this.repository.create(feedback)
    
  }
}