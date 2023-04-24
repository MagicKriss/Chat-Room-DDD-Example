import { Test, TestingModule } from '@nestjs/testing';
import { USER_STORAGE } from 'src/storage/user-storage/user-storage-service.factory';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: USER_STORAGE, useValue: jest.fn() }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
