import { FactoryProvider } from '@nestjs/common';
import { CHATROOM_STORAGE } from 'src/storage/chatroom-storage/chatroom-storage-service.factory';
import { IChatroomStorage } from 'src/storage/chatroom-storage/chatroom-storage.interface';
import { MESSAGE_STORAGE } from 'src/storage/message-storage/message-storage-service.factory';
import { IMessageStorage } from 'src/storage/message-storage/message-storage.interface';
import { IChatroomService } from './chatroom-service.interface';
import { ChatroomService } from './chatroom.service';

export const CHATROOM_SERVICE = Symbol('CHATROOM_SERVICE');

export const chatroomServiceFactory: FactoryProvider<IChatroomService> = {
  provide: CHATROOM_SERVICE,
  useFactory: (
    chatroomStorage: IChatroomStorage,
    messageStorage: IMessageStorage,
  ) => {
    return new ChatroomService(chatroomStorage, messageStorage);
  },
  inject: [CHATROOM_STORAGE, MESSAGE_STORAGE],
};
