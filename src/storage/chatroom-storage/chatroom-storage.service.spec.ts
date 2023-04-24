import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomStorageService } from './chatroom-storage.service';

describe('ChatroomStorageService', () => {
  let service: ChatroomStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatroomStorageService],
    }).compile();

    service = module.get<ChatroomStorageService>(ChatroomStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
