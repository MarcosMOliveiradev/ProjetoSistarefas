import { MediaRepository } from "../../repositories/MediaRepository.ts";

export class ListMedias {
    constructor ( private mediaRepository: MediaRepository) {}

    async exec() {
        const medias = await this.mediaRepository.find();

        return medias
    }
}