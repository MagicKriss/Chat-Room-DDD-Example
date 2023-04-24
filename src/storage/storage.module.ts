import { Module } from '@nestjs/common';
import {
  CHATROOM_STORAGE,
  chatroomStorageServiceFactory,
} from './chatroom-storage/chatroom-storage-service.factory';
import { ChatroomStorageService } from './chatroom-storage/chatroom-storage.service';
import {
  MESSAGE_STORAGE,
  messageStorageServiceFactory,
} from './message-storage/message-storage-service.factory';
import { MessageStorageService } from './message-storage/message-storage.service';
import { PrismaService } from './prisma-service/prisma.service';
import {
  USER_STORAGE,
  userStorageServiceFactory,
} from './user-storage/user-storage-service.factory';
import { UserStorageService } from './user-storage/user-storage.service';

@Module({
  providers: [
    userStorageServiceFactory,
    chatroomStorageServiceFactory,
    messageStorageServiceFactory,
    PrismaService,
    UserStorageService,
    ChatroomStorageService,
    MessageStorageService,
  ],
  exports: [
    USER_STORAGE,
    CHATROOM_STORAGE,
    MESSAGE_STORAGE,
    UserStorageService,
    ChatroomStorageService,
    MessageStorageService,
  ],
})
export class StorageModule {}
