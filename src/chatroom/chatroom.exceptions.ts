export class ChatroomExistsException extends Error {
  constructor() {
    super('Chatroom already exists');
  }
}

export class FailedToCreateChatroomException extends Error {
  constructor() {
    super('Failed to create chatroom');
  }
}

export type CreateChatroomException =
  | ChatroomExistsException
  | FailedToCreateChatroomException;

export class UsearAlreadyInRoomException extends Error {
  constructor() {
    super('User already in room');
  }
}

export class RoomDoesNotExistException extends Error {
  constructor() {
    super('Room does not exist');
  }
}

export class UserDoesNotExistException extends Error {
  constructor() {
    super('User does not exist');
  }
}

export class FailedToAddUserToRoomException extends Error {
  constructor() {
    super('Failed to add user to room');
  }
}

export type AddUserToRoomException =
  | UsearAlreadyInRoomException
  | RoomDoesNotExistException
  | UserDoesNotExistException
  | FailedToAddUserToRoomException;

export class UserNotInRoomException extends Error {
  constructor() {
    super('User is not joined to room');
  }
}

export class FailedToSenndMessageException extends Error {
  constructor() {
    super('Failed to send message');
  }
}

export type SendMessageException =
  | FailedToSenndMessageException
  | UserNotInRoomException
  | RoomDoesNotExistException;

export class FailedToFetchLatestMessagesException extends Error {
  constructor() {
    super('Failed to fetch latest messages');
  }
}

export type GetLatestMessagesException = FailedToFetchLatestMessagesException;
