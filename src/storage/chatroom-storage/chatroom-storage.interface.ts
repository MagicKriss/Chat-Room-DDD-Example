import {
  ChatroomDTO,
  CreateChatroomRequestDTO,
} from 'src/chatroom/chatroom.dto';

export interface IChatroomStorage {
  createChatroom(chatroom: CreateChatroomRequestDTO): Promise<ChatroomDTO>;
  addUserToRoom(userId: number, roomId: number): Promise<boolean>;
  userIsInRoom(userId: number, roomId: number): Promise<boolean>;
  roomExists(roomId: number): Promise<boolean>;
}
