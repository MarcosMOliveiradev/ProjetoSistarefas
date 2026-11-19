import { Roles } from '../../application/entities/Roles.ts'
import { UserRoleRepository } from '../../application/repositories/UserRoleRepository.ts'

export class UserRoleInMemoryRepository extends UserRoleRepository {
  public items: { role: Roles; userId: string }[] = []
  async create(role: Roles, userId: string): Promise<void> { this.items.push({ role, userId }) }
}
