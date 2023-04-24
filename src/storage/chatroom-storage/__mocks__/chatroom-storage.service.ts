import { Ok } from 'src/api-utils/result.type';
import { ChatroomStorageService as OgChatroomStorageService } from '../chatroom-storage.service';
export const mockChatroomStorageService = () => {
  const {
    ChatroomStorageService: chatroomServiceClassMock,
  }: { ChatroomStorageService: typeof OgChatroomStorageService } =
    jest.genMockFromModule(
      'src/storage/chatroom-storage/chatroom-storage.service',
    );
  const chatroomServiceMock = new chatroomServiceClassMock(jest.fn() as any);
  chatroomServiceMock.createChatroom = jest.fn(async (chatroom) => {
    return Ok({ ...chatroom, id: 1 });
  });

  chatroomServiceMock.addUserToRoom = jest.fn(async (_userId, _roomId) => {
    return Promise.resolve(Ok(true));
  });

  chatroomServiceMock.userIsInRoom = jest.fn(async (_userId, _roomId) => {
    return true;
  });

  chatroomServiceMock.roomExists = jest.fn(async (_id) => {
    return true;
  });

  return chatroomServiceMock;
};

export const ChatroomStorageService = jest
  .fn()
  .mockImplementation(() => mockChatroomStorageService());

export default ChatroomStorageService;
