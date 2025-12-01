import { FeedbackDrizzleRepository } from "../../../../database/table/FeedbackDrizzleRepository.ts"
import { UpdateFeedbackStatus } from "../updateFeedbackStatus.ts"

export function makeUpdateFeedbackStatus() {
  const tarefasRepository = new FeedbackDrizzleRepository()

  const createTarefas = new UpdateFeedbackStatus( tarefasRepository)

  return createTarefas
}