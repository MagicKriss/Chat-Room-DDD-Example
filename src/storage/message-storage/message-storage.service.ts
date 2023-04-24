import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/chatroom/message.dto';
import { PrismaService } from '../prisma-service/prisma.service';
import { IMessageStorage } from './message-storage.interface';

@Injectable()
export class MessageStorageService implements IMessageStorage {
  constructor(private readonly prisma: PrismaService) {}

  sendMessage(
    userId: number,
    roomId: number,
    message: string,
  ): Promise<MessageDto> {
    throw new Error('Method not implemented.');
  }

  getLatestMessages(roomId: number, count: number): Promise<MessageDto[]> {
    throw new Error('Method not implemented.');
  }
}
