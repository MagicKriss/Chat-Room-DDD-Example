import { Result } from 'src/api-utils/result.type';
import { UserDTO, UserRequestDTO } from 'src/user/user.dto';
import { UserCreateException } from 'src/user/user.exceptions';

export interface IUserStorage {
  getUserById(id: number): Promise<UserDTO | null>;
  getUserByEmail(email: string): Promise<UserDTO | null>;
  createUser(
    data: UserRequestDTO,
  ): Promise<Result<UserDTO, UserCreateException>>;
  userExistsById(id: number): Promise<boolean>;
  userExistsByEmail(email: string): Promise<boolean>;
}
