import { PrismaUsersService } from '@/services/prisma/prisma-users-service'
import { AuthenticateUseCase } from '../authenticate'

export function makeAutehnticateUseCase() {
  const usersService = new PrismaUsersService()
  const authencateUseCase = new AuthenticateUseCase(usersService)

  return authencateUseCase
}
