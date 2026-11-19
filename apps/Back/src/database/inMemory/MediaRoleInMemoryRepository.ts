import { Roles } from '../../application/entities/Roles.ts'
import { MediaRoleRepository } from '../../application/repositories/MediaRoleRepository.ts'

export class MediaRoleInMemoryRepository extends MediaRoleRepository {
  public items: { role: Roles; mediaId: string }[] = []
  async create(role: Roles, mediaId: string): Promise<void> { this.items.push({ role, mediaId }) }
}
