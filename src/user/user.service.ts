import { Inject, Injectable } from '@nestjs/common';
import { Err, Ok, Result } from 'src/api-utils/result.type';
import { USER_STORAGE } from 'src/storage/user-storage/user-storage-service.factory';
import { IUserStorage } from 'src/storage/user-storage/user-storage.interface';
import { IUserService } from './user-service.interface';
import { UserDTO, UserRequestDTO } from './user.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_STORAGE) private readonly userStorage: IUserStorage,
  ) {}

  async createUser(user: UserRequestDTO): Promise<Result<UserDTO, Error>> {
    const newUser = await this.userStorage.createUser(user);
    if (!newUser) {
      return Err(new Error('Failed to create user'));
    }
    return Ok(newUser);
  }

  existsUserWIthId(id: number): Promise<boolean> {
    return this.userStorage.userExistsById(id);
  }

  existsUserWithEmail(email: string): Promise<boolean> {
    return this.userStorage.userExistsByEmail(email);
  }

  async getUserById(id: number): Promise<Result<UserDTO, Error>> {
    const user = await this.userStorage.getUserById(id);
    if (!user) {
      return Err(new Error('User not found'));
    }
    return Ok(user);
  }

  async getUserByEmail(email: string): Promise<Result<UserDTO, Error>> {
    const user = await this.userStorage.getUserByEmail(email);
    if (!user) {
      return Err(new Error('User not found'));
    }
    return Ok(user);
  }
}
