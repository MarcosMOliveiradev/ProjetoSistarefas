import type { feedbackOptions } from "../application/entities/Feedback.ts";

export interface FeedbackDTO {
  id: string;
  conteudo: string;
  status: "ANALIZANDO" | "EM ANDAMENTO" | "CONCLUIDO" | "CANCELADO" | null
  nome: string | null | undefined;
  createdAt: Date;
  updatedAt?: Date | null;
}