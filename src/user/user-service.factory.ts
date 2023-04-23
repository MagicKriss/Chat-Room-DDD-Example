import { FactoryProvider } from '@nestjs/common';
import { USER_STORAGE } from 'src/storage/user-storage/user-storage-service.factory';
import { IUserStorage } from 'src/storage/user-storage/user-storage.interface';
import { IUserService } from './user-service.interface';
import { UserService } from './user.service';

export const USER_SERVICE = Symbol('USER_SERVICE');

export const userServiceFactory: FactoryProvider<IUserService> = {
  provide: USER_SERVICE,
  useFactory: (userStorage: IUserStorage) => {
    return new UserService(userStorage);
  },
  inject: [USER_STORAGE],
};
