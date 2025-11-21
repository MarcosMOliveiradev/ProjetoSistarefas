import { CategoryEnum, Media } from "../../entities/Media.ts";
import { Roles } from "../../entities/Roles.ts";
import { MediaRepository } from "../../repositories/MediaRepository.ts";
import { MediaRoleRepository } from "../../repositories/MediaRoleRepository.ts";

export interface ICreateMedia {
    name: string;
    description: string | undefined;
    category: CategoryEnum;
    costumerId: string;
    listFor: Roles
}

export class CreateMedia {
    constructor(
        private mediaRepository: MediaRepository,
        private mediaRoleRepository: MediaRoleRepository
    ) {}

    async exec(data: ICreateMedia) {
        const { name, category, costumerId, description, listFor } = data

        const created = new Media({
            category,
            costumerId,
            description,
            name,
            createdAt: new Date(),
        })

        const media = await this.mediaRepository.create(created);

        // responsavel por criar a relação de role e usuario
        await this.mediaRoleRepository.create(
            listFor,
            media.id
        );

        return {
            media
        }
    }
}