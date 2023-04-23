import { Module } from '@nestjs/common';
import { PrismaService } from './prisma-service/prisma.service';
import {
  USER_STORAGE,
  userStorageServiceFactory,
} from './user-storage/user-storage-service.factory';
import { UserStorageService } from './user-storage/user-storage.service';

@Module({
  providers: [userStorageServiceFactory, PrismaService, UserStorageService],
  exports: [USER_STORAGE, UserStorageService],
})
export class StorageModule {}
