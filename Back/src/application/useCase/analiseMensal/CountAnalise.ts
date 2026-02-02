import type { AnaliseMensalRepository } from "../../repositories/AnaliseMensalRepository.ts";

interface ICountRequest {
  usuarioId: string
}
export class CountAnalise {
  constructor ( private repository: AnaliseMensalRepository ) {}

  async execute({ usuarioId }: ICountRequest ) {
    const total = await this.repository.countAnalise(usuarioId)

    return total
  }
}