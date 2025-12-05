import type { TarefasRepository } from "../../repositories/TarefasRepository.ts"

interface SetorProps {
  userId: string
  codigo: number
}

export class ContagemCodigo {
  constructor(private tarefasRepository: TarefasRepository) {}

  async  execute({ userId, codigo }: SetorProps) {

    const countCodigo = await this.tarefasRepository.contagemCodigo(userId, codigo)

    return countCodigo
  }
}