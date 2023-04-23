import { FactoryProvider } from '@nestjs/common';
import { PrismaService } from '../prisma-service/prisma.service';
import { IUserStorage } from './user-storage.interface';
import { UserStorageService } from './user-storage.service';

export const USER_STORAGE = Symbol('USER_STORAGE');

export const userStorageServiceFactory: FactoryProvider<IUserStorage> = {
  provide: USER_STORAGE,
  useFactory: (prisma: PrismaService) => {
    return new UserStorageService(prisma);
  },
  inject: [PrismaService],
};
