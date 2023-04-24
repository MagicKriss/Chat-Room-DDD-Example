import { Result } from 'src/api-utils/result.type';
import { UserDTO, UserRequestDTO } from './user.dto';
import { UserCreateException, UserGetException } from './user.exceptions';

export interface IUserService {
  createUser(
    user: UserRequestDTO,
  ): Promise<Result<UserDTO, UserCreateException>>;
  existsUserWIthId(id: number): Promise<boolean>;
  existsUserWithEmail(email: string): Promise<boolean>;
  getUserById(id: number): Promise<Result<UserDTO, UserGetException>>;
  getUserByEmail(email: string): Promise<Result<UserDTO, UserGetException>>;
}
