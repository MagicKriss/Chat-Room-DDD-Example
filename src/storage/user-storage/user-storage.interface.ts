import { UserDTO, UserRequestDTO } from 'src/user/user.dto';

export interface IUserStorage {
  getUser(id: number): Promise<UserDTO | null>;
  createUser(data: UserRequestDTO): Promise<UserDTO>;
  userExists(id: number): Promise<boolean>;
}
