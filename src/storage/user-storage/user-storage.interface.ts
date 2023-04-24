import { UserDTO, UserRequestDTO } from 'src/user/user.dto';

export interface IUserStorage {
  getUserById(id: number): Promise<UserDTO | null>;
  getUserByEmail(email: string): Promise<UserDTO | null>;
  createUser(data: UserRequestDTO): Promise<UserDTO>;
  userExistsById(id: number): Promise<boolean>;
  userExistsByEmail(email: string): Promise<boolean>;
}
