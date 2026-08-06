import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // pega somente o cookie refreshToken
    const refreshToken = request.cookies.refreshToken

    if (!refreshToken) {
      return reply.status(401).send({
        message: 'Refresh token não encontrado',
      })
    }

    // valida o token recebido no cookie
    const payload = await request.jwtVerify<{
      sub: string
    }>({
      token: refreshToken,
    })

    // gera um novo access token
    const newAccessToken = await reply.jwtSign(
      {},
      {
        sub: payload.sub,
        expiresIn: '15m',
      }
    )

    return reply.status(200).send({
      accessToken: newAccessToken,
    })
  } catch (err) {
    console.error(err)

    return reply.status(401).send({
      message: 'Refresh token inválido',
    })
  }
}