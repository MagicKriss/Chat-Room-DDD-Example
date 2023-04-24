import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'src/api-utils/result.type';
import { CHATROOM_STORAGE } from 'src/storage/chatroom-storage/chatroom-storage-service.factory';
import { IChatroomStorage } from 'src/storage/chatroom-storage/chatroom-storage.interface';
import { MESSAGE_STORAGE } from 'src/storage/message-storage/message-storage-service.factory';
import { IMessageStorage } from 'src/storage/message-storage/message-storage.interface';
import { USER_SERVICE } from 'src/user/user-service.factory';
import { IUserService } from 'src/user/user-service.interface';
import { IChatroomService } from './chatroom-service.interface';
import { ChatroomDTO, CreateChatroomRequestDTO } from './chatroom.dto';
import { MessageDto } from './message.dto';

@Injectable()
export class ChatroomService implements IChatroomService {
  constructor(
    @Inject(CHATROOM_STORAGE)
    private readonly chatroomStorage: IChatroomStorage,
    @Inject(MESSAGE_STORAGE)
    private readonly messageStorage: IMessageStorage,
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}
  async createChatroom(
    chatroom: CreateChatroomRequestDTO,
  ): Promise<Result<ChatroomDTO, Error>> {
    const newRoom = await this.chatroomStorage.createChatroom(chatroom);
    if (!newRoom) {
      return Err(new Error('Failed to create chatroom'));
    }
    return Ok(newRoom);
  }

  async addUserToRoom(
    userId: number,
    roomId: number,
  ): Promise<Result<true, Error>> {
    // First asssume that room and user exists and that user is not already in room
    const added = await this.chatroomStorage.addUserToRoom(userId, roomId);
    if (added) {
      return Ok(true);
    }

    // Check and return reason why adding user failed
    const [userExists, userInRoom, roomExists] = await Promise.all([
      this.userService.existsUserWIthId(userId),
      this.chatroomStorage.userIsInRoom(userId, roomId),
      this.chatroomStorage.roomExists(roomId),
    ]);
    if (!userExists) {
      return Err(new Error('User does not exist'));
    }
    if (userInRoom) {
      return Err(new Error('User is already added to room'));
    }
    if (!roomExists) {
      return Err(new Error('Room does not exist'));
    }

    return Err(new Error('Failed to add user to room'));
  }

  async sendMessageToRoom(
    userId: number,
    roomId: number,
    message: string,
  ): Promise<Result<MessageDto, Error>> {
    // First checking if such room exists and user is joined room
    const [roomExists, userInRoom] = await Promise.all([
      this.chatroomStorage.roomExists(roomId),
      this.chatroomStorage.userIsInRoom(userId, roomId),
    ]);
    if (!roomExists) {
      return Err(new Error('Room does not exist'));
    }
    if (!userInRoom) {
      return Err(new Error('User is not in room'));
    }
    const createdMesasge = await this.messageStorage.sendMessage(
      userId,
      roomId,
      message,
    );
    if (!createdMesasge) {
      return Err(new Error('Failed to send message'));
    }
    return Ok(createdMesasge);
  }

  async getLatestRoomMessages(
    roomId: number,
    count: number,
  ): Promise<Result<MessageDto[], Error>> {
    const messages = await this.messageStorage.getLatestMessages(roomId, count);
    if (!messages) {
      return Err(new Error('Failed to get messages'));
    }
    return Ok(messages);
  }
}
