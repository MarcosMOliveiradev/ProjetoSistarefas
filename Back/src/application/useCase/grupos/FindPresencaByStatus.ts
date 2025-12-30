import type { statusPresencaEnum } from "../../entities/Roles.ts";
import type { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface IStatusRequest {
  status: statusPresencaEnum
}
export class FindPresencaByStatus{
  constructor (private repository: PresencaRepository) {}

  async execute({ status }: IStatusRequest) {
    const pendente = this.repository.findByPendente(status)

    return pendente
  }
}