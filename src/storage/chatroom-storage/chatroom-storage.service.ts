import { Injectable } from '@nestjs/common';
import { Prisma, RoomUser as PrismaRoomUser } from '@prisma/client';
import { Err, Ok, Result } from 'src/api-utils/result.type';
import {
  ChatroomDTO,
  CreateChatroomRequestDTO,
} from 'src/chatroom/chatroom.dto';
import {
  AddUserToRoomException,
  ChatroomExistsException,
  CreateChatroomException,
  FailedToAddUserToRoomException,
  FailedToCreateChatroomException,
  RoomDoesNotExistException,
  UsearAlreadyInRoomException,
  UserDoesNotExistException,
} from '../../chatroom/chatroom.exceptions';
import { PrismaService } from '../prisma-service/prisma.service';
import { IChatroomStorage } from './chatroom-storage.interface';

@Injectable()
export class ChatroomStorageService implements IChatroomStorage {
  private static readonly ROOM_USER_CHATROOM_ID: keyof PrismaRoomUser =
    'chatroomId';

  constructor(private readonly prisma: PrismaService) {}

  async createChatroom(
    data: CreateChatroomRequestDTO,
  ): Promise<Result<ChatroomDTO, CreateChatroomException>> {
    try {
      const room = await this.prisma.chatroom.create({ data });
      return Ok(room);
    } catch (e) {
      console.error(e);
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return Err(new ChatroomExistsException());
      }
      return Err(new FailedToCreateChatroomException());
    }
  }

  async addUserToRoom(
    userId: number,
    chatroomId: number,
  ): Promise<Result<true, AddUserToRoomException>> {
    try {
      const roomUser = await this.prisma.roomUser.create({
        data: { userId, chatroomId },
      });
      if (!!roomUser) {
        return Ok(true);
      }
      return Err(new FailedToAddUserToRoomException());
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log('E', e.meta);
        switch (e.code) {
          case 'P2002':
            return Err(new UsearAlreadyInRoomException());
          case 'P2003':
            const fieldName = e.meta?.field_name;
            if (
              fieldName &&
              typeof fieldName === 'string' &&
              fieldName.includes(ChatroomStorageService.ROOM_USER_CHATROOM_ID)
            ) {
              return Err(new RoomDoesNotExistException());
            }
            return Err(new UserDoesNotExistException());
        }
      }
      return Err(new FailedToAddUserToRoomException());
    }
  }

  async userIsInRoom(userId: number, chatroomId: number): Promise<boolean> {
    const user = await this.prisma.roomUser.findFirst({
      where: { userId, chatroomId },
    });
    return !!user;
  }

  async roomExists(chatroomId: number): Promise<boolean> {
    const room = await this.prisma.chatroom.findFirst({
      where: { id: chatroomId },
    });

    return !!room;
  }
}
