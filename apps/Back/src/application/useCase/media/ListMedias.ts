import { Roles } from "../../entities/Roles.ts";
import { MediaRepository } from "../../repositories/MediaRepository.ts";

interface IUserRole {
    role: Roles
}
export class ListMedias {
    constructor ( private mediaRepository: MediaRepository) {}

    async exec({ role }: IUserRole) {
        const medias = await this.mediaRepository.find(role);

        return medias
    }
}