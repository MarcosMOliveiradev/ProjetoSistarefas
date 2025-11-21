import { MediaDrizzleRepository } from "../../../../database/table/MediaDrizzleRepository.ts";
import { MediaRoleDrizzleRepository } from "../../../../database/table/MediaRoleDrizzleRepository.ts";
import { CreateMedia } from "../CreateMedia.ts";

export function makeCreateMedia() {
    const mediaRepository = new MediaDrizzleRepository();
    const mediaRoleRepository = new MediaRoleDrizzleRepository();
    const makeCreateMedia = new CreateMedia(mediaRepository, mediaRoleRepository)

    return makeCreateMedia;
}