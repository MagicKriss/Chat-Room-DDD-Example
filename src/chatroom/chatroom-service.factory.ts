import { FactoryProvider } from '@nestjs/common';
import { CHATROOM_STORAGE } from 'src/storage/chatroom-storage/chatroom-storage-service.factory';
import { IChatroomStorage } from 'src/storage/chatroom-storage/chatroom-storage.interface';
import { MESSAGE_STORAGE } from 'src/storage/message-storage/message-storage-service.factory';
import { IMessageStorage } from 'src/storage/message-storage/message-storage.interface';
import { USER_SERVICE } from 'src/user/user-service.factory';
import { IUserService } from 'src/user/user-service.interface';
import { IChatroomService } from './chatroom-service.interface';
import { ChatroomService } from './chatroom.service';

export const CHATROOM_SERVICE = Symbol('CHATROOM_SERVICE');

export const chatroomServiceFactory: FactoryProvider<IChatroomService> = {
  provide: CHATROOM_SERVICE,
  useFactory: (
    chatroomStorage: IChatroomStorage,
    messageStorage: IMessageStorage,
    userService: IUserService,
  ) => {
    return new ChatroomService(chatroomStorage, messageStorage, userService);
  },
  inject: [CHATROOM_STORAGE, MESSAGE_STORAGE, USER_SERVICE],
};
