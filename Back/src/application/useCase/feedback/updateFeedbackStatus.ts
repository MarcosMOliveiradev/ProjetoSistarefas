import type { feedbackOptions } from "../../entities/Feedback.ts"
import type { FeedbackRepository } from "../../repositories/FeedbackRepository.ts"


interface IFeedbackRequest {
  status: feedbackOptions
  id: string
}


export class UpdateFeedbackStatus {
  constructor( private repository: FeedbackRepository ){}

  async execute({ id, status }: IFeedbackRequest): Promise<void> {

    await this.repository.updateStatus(status, id)

  }
}