import { Media } from "../entities/Media.ts";
import { Roles } from "../entities/Roles.ts";

export abstract class MediaRepository {
    abstract create(media: Media): Promise<Media>;
    abstract find(role: Roles): Promise<Media[]>;
}