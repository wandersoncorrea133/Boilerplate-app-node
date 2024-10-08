import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
