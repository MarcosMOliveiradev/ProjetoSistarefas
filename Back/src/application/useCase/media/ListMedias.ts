import { MediaRepository } from "../../repositories/MediaRepository.ts";
interface IUserRole {
    role: string
}
export class ListMedias {
    constructor ( private mediaRepository: MediaRepository) {}

    async exec({ role }: IUserRole) {
        const medias = await this.mediaRepository.find(role);

        return medias
    }
}