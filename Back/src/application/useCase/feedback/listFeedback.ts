import type { FeedbackDTO } from "../../../DTOs/feedbackDTO.ts"
import type { FeedbackRepository } from "../../repositories/FeedbackRepository.ts"
import { UnexisteFeedback } from "./error/unexistFeedback.ts"

interface IFeedbackRequest {
  id: string
}


export class ListFeedback {
  constructor( private repository: FeedbackRepository ){}

  async execute({ id }: IFeedbackRequest): Promise<FeedbackDTO> {

    const feedbacks = await this.repository.findById(id)

    if(!feedbacks) {
      throw new UnexisteFeedback()
    }

    return feedbacks
    
  }
}