import { Result } from 'src/api-utils/result.type';
import {
  AddUserToRoomRequestDTO,
  ChatroomDTO,
  CreateChatroomRequestDTO,
} from './chatroom.dto';
import {
  AddUserToRoomException,
  CreateChatroomException,
  GetLatestMessagesException,
  SendMessageException,
} from './chatroom.exceptions';
import { MessageDto, SendMessageRequestDto } from './message.dto';

// TODO add custom error types
export interface IChatroomService {
  createChatroom(
    chatroom: CreateChatroomRequestDTO,
  ): Promise<Result<ChatroomDTO, CreateChatroomException>>;
  addUserToRoom(
    body: AddUserToRoomRequestDTO,
  ): Promise<Result<true, AddUserToRoomException>>;
  sendMessageToRoom(
    body: SendMessageRequestDto,
  ): Promise<Result<MessageDto, SendMessageException>>;
  getLatestRoomMessages(
    roomId: number,
    count: number,
  ): Promise<Result<MessageDto[], GetLatestMessagesException>>;
}
