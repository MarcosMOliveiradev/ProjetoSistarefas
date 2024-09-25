import { ActivyRepository } from "src/application/repositories/activy/Activy-repository";

interface IDelet {
    id: string
}

export class Delet {
    constructor(private activityRepository: ActivyRepository) {
        Promise<void>
    }

    async execute({ id }: IDelet) {
        try {
            await this.activityRepository.delet(id)
        } catch (err) {
            throw new Error(`message: ${err}`)
        }
    }
}