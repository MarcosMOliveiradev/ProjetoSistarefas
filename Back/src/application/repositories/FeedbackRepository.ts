import type { FeedbackDTO } from "../../DTOs/feedbackDTO.ts";
import type { Feedback, feedbackOptions } from "../entities/Feedback.ts";

export abstract class FeedbackRepository {
  abstract create(feedback: Feedback): Promise<void>
  abstract findById(id: string): Promise<FeedbackDTO | null>
  abstract findAll(): Promise<FeedbackDTO[]>
  abstract updateStatus(status: feedbackOptions, id: string): Promise<void>
}