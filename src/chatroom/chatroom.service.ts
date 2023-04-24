import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'src/api-utils/result.type';
import { CHATROOM_STORAGE } from 'src/storage/chatroom-storage/chatroom-storage-service.factory';
import { IChatroomStorage } from 'src/storage/chatroom-storage/chatroom-storage.interface';
import { MESSAGE_STORAGE } from 'src/storage/message-storage/message-storage-service.factory';
import { IMessageStorage } from 'src/storage/message-storage/message-storage.interface';
import { IChatroomService } from './chatroom-service.interface';
import {
  AddUserToRoomRequestDTO,
  ChatroomDTO,
  CreateChatroomRequestDTO,
} from './chatroom.dto';
import {
  AddUserToRoomException,
  CreateChatroomException,
  FailedToFetchLatestMessagesException,
  FailedToSenndMessageException,
  GetLatestMessagesException,
  RoomDoesNotExistException,
  SendMessageException,
  UserNotInRoomException,
} from './chatroom.exceptions';
import { MessageDto, SendMessageRequestDto } from './message.dto';

@Injectable()
export class ChatroomService implements IChatroomService {
  constructor(
    @Inject(CHATROOM_STORAGE)
    private readonly chatroomStorage: IChatroomStorage,
    @Inject(MESSAGE_STORAGE)
    private readonly messageStorage: IMessageStorage,
  ) {}
  async createChatroom(
    chatroom: CreateChatroomRequestDTO,
  ): Promise<Result<ChatroomDTO, CreateChatroomException>> {
    return this.chatroomStorage.createChatroom(chatroom);
  }

  addUserToRoom({
    userId,
    roomId,
  }: AddUserToRoomRequestDTO): Promise<Result<true, AddUserToRoomException>> {
    return this.chatroomStorage.addUserToRoom(userId, roomId);
  }

  async sendMessageToRoom({
    userId,
    roomId,
    message,
  }: SendMessageRequestDto): Promise<Result<MessageDto, SendMessageException>> {
    // First checking if such room exists and user is joined room
    const [roomExists, userInRoom] = await Promise.all([
      this.chatroomStorage.roomExists(roomId),
      this.chatroomStorage.userIsInRoom(userId, roomId),
    ]);
    if (!roomExists) {
      return Err(new RoomDoesNotExistException());
    }
    if (!userInRoom) {
      return Err(new UserNotInRoomException());
    }
    const createdMesasge = await this.messageStorage.sendMessage(
      userId,
      roomId,
      message,
    );
    if (!createdMesasge) {
      return Err(new FailedToSenndMessageException());
    }
    return Ok(createdMesasge);
  }

  async getLatestRoomMessages(
    roomId: number,
    count: number,
  ): Promise<Result<MessageDto[], GetLatestMessagesException>> {
    const messages = await this.messageStorage.getLatestMessages(roomId, count);
    if (!messages) {
      return Err(new FailedToFetchLatestMessagesException());
    }
    return Ok(messages);
  }
}
