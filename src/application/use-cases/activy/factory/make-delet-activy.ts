import { PrismaActivyRepository } from "src/database/prisma/repositoris/prisma-activy-repository";
import { Delet } from "../Delet-activity";

export function makeDeletActivity() {
    const repository = new PrismaActivyRepository()
    const deletActivity = new Delet(repository)

    return deletActivity;
}