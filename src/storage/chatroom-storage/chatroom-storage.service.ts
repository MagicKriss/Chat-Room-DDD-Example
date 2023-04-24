import { Injectable } from '@nestjs/common';
import {
  ChatroomDTO,
  CreateChatroomRequestDTO,
} from 'src/chatroom/chatroom.dto';
import { PrismaService } from '../prisma-service/prisma.service';
import { IChatroomStorage } from './chatroom-storage.interface';

@Injectable()
export class ChatroomStorageService implements IChatroomStorage {
  constructor(private readonly prisma: PrismaService) {}

  createChatroom(chatroom: CreateChatroomRequestDTO): Promise<ChatroomDTO> {
    throw new Error('Method not implemented.');
  }
  addUserToRoom(userId: number, roomId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  userIsInRoom(userId: number, roomId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  roomExists(roomId: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
