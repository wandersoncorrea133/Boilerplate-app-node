import { PrismaUsersService } from '@/services/prisma/prisma-users-service'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const userService = new PrismaUsersService()
  const getUserProfileUseCase = new GetUserProfileUseCase(userService)

  return getUserProfileUseCase
}
