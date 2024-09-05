import { PrismaUsersService } from '@/services/prisma/prisma-users-service'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const userService = new PrismaUsersService()
  const registerUseCase = new RegisterUseCase(userService)

  return registerUseCase
}
