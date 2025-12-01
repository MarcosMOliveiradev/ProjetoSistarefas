import { eq } from "drizzle-orm";
import type { Feedback, feedbackOptions } from "../../application/entities/Feedback.ts";
import { FeedbackRepository } from "../../application/repositories/FeedbackRepository.ts";
import type { FeedbackDTO } from "../../DTOs/feedbackDTO.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class FeedbackDrizzleRepository extends FeedbackRepository {
  async create(feedback: Feedback): Promise<void> {
    await db.insert(schema.feedback).values({
      id: feedback.id,
      conteudo: feedback.conteudo,
      status: feedback.status,
      nome: feedback.nome,
      createdAt: feedback.createdAt,
      updatedAt: feedback.updatedAt ?? new Date()
    })
  }
  async findById(id: string): Promise<FeedbackDTO | null> {
    const [feedback] = await db.select().from(schema.feedback).where(eq(schema.feedback.id, id))

    return feedback
  }
  async findAll(): Promise<FeedbackDTO[]> {
    const feedbacks = await db.select().from(schema.feedback)

    return feedbacks
  }
  async updateStatus(status: feedbackOptions, id: string): Promise<void> {
    await db.update(schema.feedback)
      .set({status: status, updatedAt: new Date()})
      .where(eq(schema.feedback.id, id))
  }
}