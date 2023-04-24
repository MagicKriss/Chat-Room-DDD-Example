import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma-service/prisma.service';
import { UserStorageService } from './user-storage.service';

describe('UserStorageService', () => {
  let service: UserStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStorageService, PrismaService],
    }).compile();

    service = module.get<UserStorageService>(UserStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
