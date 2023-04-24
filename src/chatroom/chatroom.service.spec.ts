import { Test, TestingModule } from '@nestjs/testing';
import { Err } from 'src/api-utils/result.type';
import { ChatroomStorageService as ChatroomStorageServiceMock } from 'src/storage/chatroom-storage/__mocks__/chatroom-storage.service';
import { CHATROOM_STORAGE } from 'src/storage/chatroom-storage/chatroom-storage-service.factory';
import { IChatroomStorage } from 'src/storage/chatroom-storage/chatroom-storage.interface';
import { MessageStorageService as MessageStorageServiceMock } from 'src/storage/message-storage/__mocks__/message-storage.service';
import { MESSAGE_STORAGE } from 'src/storage/message-storage/message-storage-service.factory';
import { IMessageStorage } from 'src/storage/message-storage/message-storage.interface';
import {
  ChatroomExistsException,
  FailedToAddUserToRoomException,
  FailedToCreateChatroomException,
  RoomDoesNotExistException,
  UsearAlreadyInRoomException,
  UserDoesNotExistException,
} from './chatroom.exceptions';
import { ChatroomService } from './chatroom.service';

describe('ChatroomService', () => {
  let service: ChatroomService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ChatroomService,
        { provide: CHATROOM_STORAGE, useClass: ChatroomStorageServiceMock },
        { provide: MESSAGE_STORAGE, useClass: MessageStorageServiceMock },
      ],
    }).compile();

    service = module.get<ChatroomService>(ChatroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createChatroom', () => {
    it('should create a new chatroom', async () => {
      const result = await service.createChatroom({
        name: 'test',
      });
      expect(result).toMatchObject({
        ok: true,
        value: expect.objectContaining({
          id: expect.any(Number),
          name: 'test',
        }),
      });
    });
    it('should return an error if chatroom already exists', async () => {
      const chatroomStorage = module.get<IChatroomStorage>(CHATROOM_STORAGE);
      jest
        .spyOn(chatroomStorage, 'createChatroom')
        .mockResolvedValue(Err(new ChatroomExistsException()));
      const result = await service.createChatroom({
        name: 'test',
      });
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
    it('should return error if failed to create chatroom', async () => {
      const chatroomStorage = module.get<IChatroomStorage>(CHATROOM_STORAGE);
      jest
        .spyOn(chatroomStorage, 'createChatroom')
        .mockResolvedValue(Err(new FailedToCreateChatroomException()));
      const result = await service.createChatroom({
        name: 'test',
      });
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
  });
  describe('addUserToRoom', () => {
    it('should add user to room', async () => {
      const result = await service.addUserToRoom({ userId: 1, roomId: 1 });
      expect(result).toMatchObject({
        ok: true,
        value: true,
      });
    });
    it('should return error if room does not exist', async () => {
      const chatroomStorage = module.get<IChatroomStorage>(CHATROOM_STORAGE);
      jest
        .spyOn(chatroomStorage, 'addUserToRoom')
        .mockResolvedValue(Err(new RoomDoesNotExistException()));
      const result = await service.addUserToRoom({ userId: 1, roomId: 1 });
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
    it('should return error if user does not exist', async () => {
      const chatroomStorage = module.get<IChatroomStorage>(CHATROOM_STORAGE);
      jest
        .spyOn(chatroomStorage, 'addUserToRoom')
        .mockResolvedValue(Err(new UserDoesNotExistException()));
      const result = await service.addUserToRoom({ userId: 1, roomId: 1 });
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
    it('should return error if user already added to room', async () => {
      const chatroomStorage = module.get<IChatroomStorage>(CHATROOM_STORAGE);
      jest
        .spyOn(chatroomStorage, 'addUserToRoom')
        .mockResolvedValue(Err(new UsearAlreadyInRoomException()));
      const result = await service.addUserToRoom({ userId: 1, roomId: 1 });
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
    it('should return error if failed to add user to room', async () => {
      const chatroomStorage = module.get<IChatroomStorage>(CHATROOM_STORAGE);
      jest
        .spyOn(chatroomStorage, 'addUserToRoom')
        .mockResolvedValue(Err(new FailedToAddUserToRoomException()));
      const result = await service.addUserToRoom({ userId: 1, roomId: 1 });
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
  });
  describe('sendMessageToRoom', () => {
    it('should send message to room', async () => {
      const message = {
        roomId: 1,
        userId: 1,
        message: 'test',
      };
      const result = await service.sendMessageToRoom(message);
      expect(result).toMatchObject({
        ok: true,
        value: expect.objectContaining({
          id: expect.any(Number),
          roomId: message.roomId,
          senderId: message.userId,
          message: message.message,
          createdAt: expect.any(Date),
        }),
      });
    });

    it('should return error if room does not exist', async () => {
      const messageStorage = module.get<IMessageStorage>(MESSAGE_STORAGE);
      jest.spyOn(messageStorage, 'sendMessage').mockResolvedValue(null as any);
      const message = {
        roomId: 1,
        userId: 1,
        message: 'test',
      };
      const result = await service.sendMessageToRoom(message);
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
  });
  describe('getChatroomMessages', () => {
    it('should return messages for chatroom', async () => {
      const result = await service.getLatestRoomMessages(1, 10);
      expect(result).toMatchObject({
        ok: true,
        value: expect.any(Array),
      });
    });
    it('should return error if room does not exist', async () => {
      const messageStorage = module.get<IMessageStorage>(MESSAGE_STORAGE);
      jest
        .spyOn(messageStorage, 'getLatestMessages')
        .mockResolvedValue(null as any);
      const result = await service.getLatestRoomMessages(1, 10);
      expect(result).toMatchObject({
        ok: false,
        error: expect.any(Error),
      });
    });
  });
});
