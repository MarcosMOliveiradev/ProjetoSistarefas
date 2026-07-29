import { MediaDrizzleRepository } from "../../../../database/table/MediaDrizzleRepository.ts";
import { DeleteMedia } from "../DeleteMadia.ts";

export function makeDeleteMedias() {
    const mediaRepository = new MediaDrizzleRepository()
    const deleteMedia = new DeleteMedia(mediaRepository)

    return deleteMedia;
}