import { turnoEnum } from "../../entities/Roles.ts";
import { UserRepository } from "../../repositories/UserRepository.ts";

interface IUpdateTurno {
    userId: string;
    turno: turnoEnum;
}

export class UpdateTurno{
    constructor (private userRepository: UserRepository) {}

    async execute({ turno, userId }: IUpdateTurno) {
        await this.userRepository.updateTurno(userId, turno)
    }
}