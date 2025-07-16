import { Media } from "../../application/entities/Media.ts";
import { MediaRepository } from "../../application/repositories/MediaRepository.ts";
import { db } from "../connection.ts";
import { schema } from "../drizzle/index.ts";


export class MediaDrizzleRepository extends MediaRepository {
    async create(data: Media): Promise<Media> {
        const [createMedia] = await db.insert(schema.media).values([{
            id: data.id,
            name: data.name,
            category: data.category,
            description: data.description,
            costumerId: data.costumerId,
            createdAt: data.createdAt,
            updatedAt: new Date(),
        }]).returning();

        return createMedia
    }
    async find(): Promise<Media[]> {
        throw new Error("Method not implemented.");
    }
}