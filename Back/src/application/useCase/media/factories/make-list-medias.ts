import { MediaDrizzleRepository } from "../../../../database/table/MediaDrizzleRepository.ts";
import { ListMedias } from "../ListMedias.ts";

export function makeListMedias() {
    const mediaRepository = new MediaDrizzleRepository()
    const listMedias = new ListMedias(mediaRepository)

    return listMedias;
}