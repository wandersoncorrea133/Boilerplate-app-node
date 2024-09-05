import { InmemoryUserService } from '@/services/in-memory/in-memory-users-service'
import { RegisterUseCase } from './register'
import { compare } from 'bcrypt'
import { beforeEach, describe, it, expect } from 'vitest'
import { UserALreadyExistsError } from './errors/user-already-exists-error'

let usersService: InmemoryUserService
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersService = new InmemoryUserService()
    sut = new RegisterUseCase(usersService)
  })

  it('Should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhonDoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Jhon Doe',
      email: 'jhonDoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'jhonDoe@example.com'

    await sut.execute({
      name: 'Jhon Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Jhon Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserALreadyExistsError)
  })
})
