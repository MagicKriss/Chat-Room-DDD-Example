import { FactoryProvider } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { IChatroomStorage } from './chatroom-storage.interface';
import { ChatroomStorageService } from './chatroom-storage.service';

export const CHATROOM_STORAGE = Symbol('CHATROOM_STORAGE');

export const chatroomStorageServiceFactory: FactoryProvider<IChatroomStorage> =
  {
    provide: CHATROOM_STORAGE,
    useFactory: (prisma: PrismaService) => {
      return new ChatroomStorageService(prisma);
    },
    inject: [PrismaService],
  };
