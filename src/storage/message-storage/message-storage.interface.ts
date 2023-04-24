import { MessageDto } from 'src/chatroom/message.dto';

export interface IMessageStorage {
  sendMessage(
    userId: number,
    roomId: number,
    message: string,
  ): Promise<MessageDto>;
  getLatestMessages(roomId: number, count: number): Promise<MessageDto[]>;
}
