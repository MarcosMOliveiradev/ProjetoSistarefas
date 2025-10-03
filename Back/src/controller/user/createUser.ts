import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { Roles } from "../../application/entities/Roles.ts";

export async function createUserController(request: FastifyRequest , reply: FastifyReply ) {
  const createUserSchema = z.object({
    name: z.string(),
    matricula: z.number(),
    password: z.string(),
    avataUrl: z.string(),
    role: z.enum(Roles)
  })
}