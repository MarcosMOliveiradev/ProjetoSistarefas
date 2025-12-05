import type { TarefasRepository } from "../../repositories/TarefasRepository.ts";
export interface ContagemTotal {
  userId: string
}

export class contagemTotal {
  constructor (private repository: TarefasRepository) {}

  async execut({ userId }: ContagemTotal) {
    const total = await this.repository.contagem(userId)

    return total
  }
}