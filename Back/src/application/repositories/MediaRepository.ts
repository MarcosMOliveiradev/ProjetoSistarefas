import { Media } from "../entities/Media.ts";
import { Roles } from "../entities/Roles.ts";

export abstract class MediaRepository {
    abstract create(media: Media): Promise<Media>;
    abstract find(role: Roles): Promise<Media[]>;
    abstract findID(id: string): Promise<Media>;
    abstract delete(id: string): Promise<void>;
}