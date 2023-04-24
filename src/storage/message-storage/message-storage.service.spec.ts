import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma-service/prisma.service';
import { MessageStorageService } from './message-storage.service';

describe('MessageStorageService', () => {
  let service: MessageStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessageStorageService, PrismaService],
    }).compile();

    service = module.get<MessageStorageService>(MessageStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
