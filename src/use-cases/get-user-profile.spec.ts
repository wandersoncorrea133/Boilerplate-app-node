import { InmemoryUserService } from '@/services/in-memory/in-memory-users-service'
import { GetUserProfileUseCase } from './get-user-profile'
import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcrypt'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersService: InmemoryUserService
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersService = new InmemoryUserService()
    sut = new GetUserProfileUseCase(usersService)
  })

  it('Should be able to get user profile', async () => {
    const createdUser = await usersService.create({
      name: 'Jhon Doe',
      email: 'jhonDoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Jhon Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
