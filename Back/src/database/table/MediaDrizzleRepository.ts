import { eq, or } from "drizzle-orm";
import { Media } from "../../application/entities/Media.ts";
import { MediaRepository } from "../../application/repositories/MediaRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";

export class MediaDrizzleRepository extends MediaRepository {
    async create(data: Media): Promise<Media> {
        const [createMedia] = await db.insert(schema.media).values([{
            id: data.id,
            titulo: data.titulo,
            category: data.category,
            description: data.description,
            url: data.url,
            costumerId: data.costumerId,
            createdAt: data.createdAt,
            updatedAt: new Date(),
        }]).returning();

        return createMedia
    }
    async find(role: string): Promise<Media[]> {
        // Se for INFORMATICA, retorna tudo
        if (role === "INFORMATICA") {
            const allMedia = await db.select()
                .from(schema.media)
                .innerJoin(
                    schema.mediaRoles,
                    eq(schema.media.id, schema.mediaRoles.mediaId)
                );

            return allMedia;
        }

        const findMedia = await db.select()
            .from(schema.media)
            .innerJoin(
                schema.mediaRoles,
                eq(schema.media.id, schema.mediaRoles.mediaId)
            )
            .where(
                or(
                    eq(schema.mediaRoles.role, role),
                    eq(schema.mediaRoles.role, "TODOS")
                )
            )
            .groupBy(schema.media.id);

        return findMedia;
    }
}