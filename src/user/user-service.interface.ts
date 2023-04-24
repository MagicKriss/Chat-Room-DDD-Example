import { UserDTO, UserRequestDTO } from './user.dto';

export interface IUserService {
  createUser(user: UserRequestDTO): Promise<UserDTO>;
  existsUserWIthId(id: number): Promise<boolean>;
  existsUserWithEmail(email: string): Promise<boolean>;
  getUser(id: number): Promise<UserDTO | null>;
}
