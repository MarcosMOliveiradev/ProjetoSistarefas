import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
import { converterNumberInTimer } from "./functions/converterNumberInTimer.ts";

interface IAverageTimeRequest {
  userId: string
}

export class AverageTime {
  constructor (private repository: TarefasRepository) {}

  async execute({ userId }: IAverageTimeRequest) {
    const average = await this.repository.averageTime(userId)

    if(!average) {
      return new Error("Não foi possivel calcular o time")
    }
    
    const averageTimeTextFormat = await converterNumberInTimer(average)

    return averageTimeTextFormat
  }
}