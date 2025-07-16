import { Media } from "../entities/Media.ts";

export abstract class MediaRepository {
    abstract create(media: Media): Promise<Media>;
    abstract find(): Promise<Media[]>;
}