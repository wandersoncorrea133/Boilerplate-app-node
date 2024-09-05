import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/user', register)

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
