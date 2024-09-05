export class UserALreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists.')
  }
}
