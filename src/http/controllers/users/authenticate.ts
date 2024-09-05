import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAutehnticateUseCase } from '../../../use-cases/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/Invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authencateUseCase = makeAutehnticateUseCase()

    const { user } = await authencateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    })

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: user.id,
        expiresIn: '7d',
      },
    })

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send()
    }

    throw err
  }
}
