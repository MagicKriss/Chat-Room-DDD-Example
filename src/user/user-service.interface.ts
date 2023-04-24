import { Result } from 'src/api-utils/result.type';
import { UserDTO, UserRequestDTO } from './user.dto';

export interface IUserService {
  createUser(user: UserRequestDTO): Promise<Result<UserDTO, Error>>;
  existsUserWIthId(id: number): Promise<boolean>;
  existsUserWithEmail(email: string): Promise<boolean>;
  getUserById(id: number): Promise<Result<UserDTO, Error>>;
  getUserByEmail(email: string): Promise<Result<UserDTO, Error>>;
}
