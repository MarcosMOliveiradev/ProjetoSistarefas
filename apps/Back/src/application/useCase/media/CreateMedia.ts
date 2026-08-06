import { CategoryEnum, Media } from "../../entities/Media.ts";
import { Roles } from "../../entities/Roles.ts";
import { MediaRepository } from "../../repositories/MediaRepository.ts";
import { MediaRoleRepository } from "../../repositories/MediaRoleRepository.ts";

export interface ICreateMedia {
    titulo: string;
    description: string | undefined;
    category: CategoryEnum;
    costumerId: string;
    listFor: Roles
    url: string;
}

export class CreateMedia {
    constructor(
        private mediaRepository: MediaRepository,
        private mediaRoleRepository: MediaRoleRepository
    ) {}

    async exec(data: ICreateMedia) {
        const { titulo, category, costumerId, description, listFor, url } = data

        const created = new Media({
            category,
            costumerId,
            description,
            url,
            titulo,

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