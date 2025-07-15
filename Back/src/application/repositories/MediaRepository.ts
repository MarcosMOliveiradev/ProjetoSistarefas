import { Media } from "../entities/media";

export abstract class MediaRepository {
    abstract create(media: Media): Promise<Media>;
    abstract find(): Promise<Media[]>;
}