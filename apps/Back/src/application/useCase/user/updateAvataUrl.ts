import type { UserRepository } from "../../repositories/UserRepository.ts";

interface UpdateAvatarUrlRequest {
  userId: string;
  avatarUrl: string;
}

export class UpdateAvatarUrl {
  constructor(private userRepository: UserRepository) {}

  async execute({ avatarUrl, userId}: UpdateAvatarUrlRequest) {
    await this.userRepository.updateAvataUrl(avatarUrl, userId);
  }
}