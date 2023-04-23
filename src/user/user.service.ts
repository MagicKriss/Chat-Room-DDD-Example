import { Inject, Injectable } from '@nestjs/common';
import { USER_STORAGE } from 'src/storage/user-storage/user-storage-service.factory';
import { IUserStorage } from 'src/storage/user-storage/user-storage.interface';
import { IUserService } from './user-service.interface';
import { UserDTO, UserRequestDTO } from './user.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_STORAGE) private readonly userStorage: IUserStorage,
  ) {}

  createUser(user: UserRequestDTO): Promise<UserDTO> {
    return this.userStorage.createUser(user);
  }
  exists(id: number): Promise<boolean> {
    return this.userStorage.userExists(id);
  }
  getUser(id: number): Promise<UserDTO | null> {
    return this.userStorage.getUser(id);
  }
}
