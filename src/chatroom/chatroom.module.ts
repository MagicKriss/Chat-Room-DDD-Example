import { Module } from '@nestjs/common';
import { ChatroomV1Controller } from './v1/chatroom-v1.controller';

@Module({
  controllers: [ChatroomV1Controller],
})
export class ChatroomModule {}
