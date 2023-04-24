export class FailedToCreateUserException extends Error {
  constructor() {
    super('Failed to create user');
  }
}

export class UserNotFoundException extends Error {
  constructor() {
    super('User not found');
  }
}

export class UserEmailInUseException extends Error {
  constructor() {
    super('User with this email already exists');
  }
}

export type UserCreateException =
  | FailedToCreateUserException
  | UserEmailInUseException;

export type UserGetException = UserNotFoundException;
