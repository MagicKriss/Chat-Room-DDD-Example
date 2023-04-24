import { Injectable } from '@nestjs/common';
import { MessageDto } from 'src/chatroom/message.dto';
import { PrismaService } from '../prisma-service/prisma.service';
import { mapMessageToMessageDTO } from './helper';
import { IMessageStorage } from './message-storage.interface';

@Injectable()
export class MessageStorageService implements IMessageStorage {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(
    userId: number,
    roomId: number,
    message: string,
  ): Promise<MessageDto> {
    const createdMessage = await this.prisma.message.create({
      data: { message, senderId: userId, chatroomId: roomId },
    });
    return mapMessageToMessageDTO(createdMessage);
  }

  async getLatestMessages(
    chatroomId: number,
    count: number,
  ): Promise<MessageDto[]> {
    const messages = await this.prisma.message.findMany({
      where: { chatroomId },
      take: count,
    });

    return messages.map(mapMessageToMessageDTO);
  }
}
