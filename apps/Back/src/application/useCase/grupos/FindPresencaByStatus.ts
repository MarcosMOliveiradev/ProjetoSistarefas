import type { statusPresencaEnum } from "../../entities/Roles.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface IStatusRequest {
  status: statusPresencaEnum
  inicio: Date
  fim: Date
}
export class FindPresencaByStatus{
  constructor (private repository: PresencaRepository) {}

  async execute({ status, fim, inicio }: IStatusRequest) {
    const pendente = this.repository.findByPendente(status, inicio, fim)

    return pendente
  }
}