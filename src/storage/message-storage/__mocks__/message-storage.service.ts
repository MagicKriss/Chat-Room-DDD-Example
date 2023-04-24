import { MessageStorageService as OgMessageStorageService } from '../message-storage.service';

export const mockMessageStorageService = () => {
  const {
    MessageStorageService: messageStorageServiceClassMock,
  }: { MessageStorageService: typeof OgMessageStorageService } =
    jest.genMockFromModule(
      'src/storage/message-storage/message-storage.service',
    );
  const messageStorageServiceMock = new messageStorageServiceClassMock(
    jest.fn() as any,
  );

  messageStorageServiceMock.sendMessage = jest.fn(
    async (userId, roomId, message) => {
      return {
        id: 1,
        message,
        senderId: userId,
        roomId: roomId,
        createdAt: new Date(),
      };
    },
  );

  messageStorageServiceMock.getLatestMessages = jest.fn(
    async (chatroomId, count) => {
      const messages = [];
      for (let i = 1; i <= count; i++) {
        messages.push({
          id: i,
          message: `Message ${i}`,
          senderId: i,
          roomId: chatroomId,
          createdAt: new Date(),
        });
      }
      return messages;
    },
  );

  return messageStorageServiceMock;
};

export const MessageStorageService = jest
  .fn()
  .mockImplementation(() => mockMessageStorageService());

export default MessageStorageService;
