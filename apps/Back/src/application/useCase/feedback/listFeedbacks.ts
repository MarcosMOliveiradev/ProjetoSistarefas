import type { FeedbackDTO } from "../../../DTOs/feedbackDTO.ts"
import type { FeedbackRepository } from "../../repositories/FeedbackRepository.ts"

export class ListFeedbacks {
  constructor( private repository: FeedbackRepository ){}

  async execute(): Promise<FeedbackDTO[]> {

    const feedbacks = await this.repository.findAll()

    return feedbacks
    
  }
}