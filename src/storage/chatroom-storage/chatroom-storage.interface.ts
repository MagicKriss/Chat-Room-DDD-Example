import { Result } from 'src/api-utils/result.type';
import {
  ChatroomDTO,
  CreateChatroomRequestDTO,
} from 'src/chatroom/chatroom.dto';
import {
  AddUserToRoomException,
  CreateChatroomException,
} from '../../chatroom/chatroom.exceptions';

export interface IChatroomStorage {
  createChatroom(
    chatroom: CreateChatroomRequestDTO,
  ): Promise<Result<ChatroomDTO, CreateChatroomException>>;
  addUserToRoom(
    userId: number,
    roomId: number,
  ): Promise<Result<true, AddUserToRoomException>>;
  userIsInRoom(userId: number, roomId: number): Promise<boolean>;
  roomExists(roomId: number): Promise<boolean>;
}
