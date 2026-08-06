import { PresencaRepository } from "../../repositories/PresencaRepository.ts";

interface IUserRequest {
    userId: string
}

export class FindPresencaUser {
    constructor(private presencaRepository: PresencaRepository) {}

    async execute({ userId }: IUserRequest) {
        const presenca = await this.presencaRepository.findPresencauser(userId)

        return presenca
    }
}