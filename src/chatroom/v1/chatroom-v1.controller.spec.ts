import { Test, TestingModule } from '@nestjs/testing';
import { ChatroomV1Controller } from './chatroom-v1.controller';

describe('ChatroomV1Controller', () => {
  let controller: ChatroomV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatroomV1Controller],
    }).compile();

    controller = module.get<ChatroomV1Controller>(ChatroomV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
