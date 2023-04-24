import { Message } from '@prisma/client';
import { MessageDto } from 'src/chatroom/message.dto';

export function mapMessageToMessageDTO(message: Message): MessageDto {
  return {
    id: message.id,
    message: message.message,
    senderId: message.senderId,
    roomId: message.chatroomId,
    createdAt: message.createdAt,
  };
}
