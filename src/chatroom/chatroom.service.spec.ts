import { Test, TestingModule } from '@nestjs/testing';
import { CHATROOM_STORAGE } from 'src/storage/chatroom-storage/chatroom-storage-service.factory';
import { MESSAGE_STORAGE } from 'src/storage/message-storage/message-storage-service.factory';
import { ChatroomService } from './chatroom.service';

describe('ChatroomService', () => {
  let service: ChatroomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatroomService,
        { provide: CHATROOM_STORAGE, useValue: jest.fn() },
        { provide: MESSAGE_STORAGE, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<ChatroomService>(ChatroomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
