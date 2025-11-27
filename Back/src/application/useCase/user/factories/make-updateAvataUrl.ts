import { UserDrizzleRepository } from "../../../../database/table/UserDrizzleRepository.ts";
import { UpdateAvatarUrl } from "../updateAvataUrl.ts";

export function makeupdateAvataUrl() {
  const repository = new UserDrizzleRepository()
  const updateAvatarUrl = new UpdateAvatarUrl(repository)

  return updateAvatarUrl
}