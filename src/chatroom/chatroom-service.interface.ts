import { Result } from 'src/api-utils/result.type';
import { ChatroomDTO, CreateChatroomRequestDTO } from './chatroom.dto';
import { MessageDto } from './message.dto';

// TODO add custom error types
export interface IChatroomService {
  createChatroom(
    chatroom: CreateChatroomRequestDTO,
  ): Promise<Result<ChatroomDTO, Error>>;
  addUserToRoom(userId: number, roomId: number): Promise<Result<true, Error>>;
  sendMessageToRoom(
    userId: number,
    roomId: number,
    message: string,
  ): Promise<Result<MessageDto, Error>>;
  getLatestRoomMessages(
    roomId: number,
    count: number,
  ): Promise<Result<MessageDto[], Error>>;
}
