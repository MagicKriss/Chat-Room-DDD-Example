import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { UserModule } from 'src/user/user.module';
import { chatroomServiceFactory } from './chatroom-service.factory';
import { ChatroomService } from './chatroom.service';
import { ChatroomV1Controller } from './v1/chatroom-v1.controller';

@Module({
  controllers: [ChatroomV1Controller],
  providers: [chatroomServiceFactory, ChatroomService],
  imports: [StorageModule, UserModule],
})
export class ChatroomModule {}
