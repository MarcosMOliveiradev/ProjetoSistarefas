import { Media } from '../../application/entities/Media.ts'
import { Roles } from '../../application/entities/Roles.ts'
import { MediaRepository } from '../../application/repositories/MediaRepository.ts'

export class MediaInMemoryRepository extends MediaRepository {
  public items: Media[] = []
  async create(media: Media): Promise<Media> { this.items.push(media); return media }
  async find(_role: Roles): Promise<Media[]> { return this.items }
  async findID(id: string): Promise<Media> { return this.items.find(item => item.id === id) as Media }
  async delete(id: string): Promise<void> { this.items = this.items.filter(item => item.id !== id) }
}
