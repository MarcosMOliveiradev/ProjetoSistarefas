import type { Roles } from "../../application/entities/Roles.ts";
import { UserRoleRepository } from "../../application/repositories/UserRoleRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class UserRoleDrizzleRepository extends UserRoleRepository {
  async create(role: Roles, userId: string): Promise<void> {
    await db.insert(schema.userRoles).values({
      role,
      userId
    })
  }
}