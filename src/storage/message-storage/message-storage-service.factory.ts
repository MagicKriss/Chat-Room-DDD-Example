import { FactoryProvider } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { IMessageStorage } from './message-storage.interface';
import { MessageStorageService } from './message-storage.service';

export const MESSAGE_STORAGE = Symbol('MESSAGE_STORAGE');

export const messageStorageServiceFactory: FactoryProvider<IMessageStorage> = {
  provide: MESSAGE_STORAGE,
  useFactory: (prisma: PrismaService) => {
    return new MessageStorageService(prisma);
  },
  inject: [PrismaService],
};
