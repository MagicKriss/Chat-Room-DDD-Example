import { UserDTO, UserRequestDTO } from './user.dto';

export interface IUserService {
  createUser(user: UserRequestDTO): Promise<UserDTO>;
  exists(id: number): Promise<boolean>;
  getUser(id: number): Promise<UserDTO | null>;
}
