import { Test, TestingModule } from '@nestjs/testing';
import { UserStorageService as UserStorageServiceMock } from 'src/storage/user-storage/__mocks__/user-storage.service';
import { USER_STORAGE } from 'src/storage/user-storage/user-storage-service.factory';
import { IUserStorage } from 'src/storage/user-storage/user-storage.interface';
import { UserRequestDTO } from './user.dto';
import { UserNotFoundException } from './user.exceptions';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: USER_STORAGE, useClass: UserStorageServiceMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: UserRequestDTO = {
        email: 'user@request.com',
        username: 'user',
      };
      const result = await service.createUser(user);
      expect(result).toMatchObject({
        ok: true,
        value: expect.objectContaining({
          id: expect.any(Number),
          email: user.email,
          username: user.username,
        }),
      });
    });
  });
  describe('getUserById', () => {
    it('should get a user by id', async () => {
      const user = await service.getUserById(1);
      expect(user).toMatchObject({
        ok: true,
        value: expect.objectContaining({
          id: 1,
          email: expect.any(String),
          username: expect.any(String),
        }),
      });
    });
    it('should return an error if user does not exist', async () => {
      const userStorage = module.get<IUserStorage>(USER_STORAGE);
      jest.spyOn(userStorage, 'getUserById').mockResolvedValue(null);
      const user = await service.getUserById(2);
      expect(user).toMatchObject({
        ok: false,
        error: expect.any(UserNotFoundException),
      });
    });
  });

  describe('getUserByEmail', () => {
    it('should get a user by email', async () => {
      const user = await service.getUserByEmail('user@request.com');
      expect(user).toMatchObject({
        ok: true,
        value: expect.objectContaining({
          id: expect.any(Number),
          email: 'user@request.com',
          username: expect.any(String),
        }),
      });
    });
    it('should return an error if user does not exist', async () => {
      const userStorage = module.get<IUserStorage>(USER_STORAGE);
      jest.spyOn(userStorage, 'getUserByEmail').mockResolvedValue(null);
      const user = await service.getUserByEmail('user@request.com');
      expect(user).toMatchObject({
        ok: false,
        error: expect.any(UserNotFoundException),
      });
    });
  });

  describe('existsUserWIthId', () => {
    it('should return true if user exists', async () => {
      const exists = await service.existsUserWIthId(1);
      expect(exists).toBe(true);
    });
    it('should return false if user does not exist', async () => {
      const userStorage = module.get<IUserStorage>(USER_STORAGE);
      jest.spyOn(userStorage, 'userExistsById').mockResolvedValue(false);
      const exists = await service.existsUserWIthId(1);
      expect(exists).toBe(false);
    });
  });
});
