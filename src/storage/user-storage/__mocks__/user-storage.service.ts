import { Ok } from 'src/api-utils/result.type';
import { UserStorageService as OgUserStorageService } from '../user-storage.service';
export const mockUserStorageService = () => {
  const {
    UserStorageService: userServiceClassMock,
  }: { UserStorageService: typeof OgUserStorageService } =
    jest.genMockFromModule('src/storage/user-storage/user-storage.service');
  const userServiceMock = new userServiceClassMock(jest.fn() as any);
  userServiceMock.createUser = jest.fn(async (user) => {
    return Ok({ ...user, id: 1 });
  });
  userServiceMock.getUserById = jest.fn(async (id) => {
    return { id, email: 'example@email.com', username: 'John Doe' };
  });
  userServiceMock.getUserByEmail = jest.fn(async (email) => {
    return { id: 1, email, username: 'John Doe' };
  });
  userServiceMock.userExistsById = jest.fn(async (_id) => {
    return true;
  });
  return userServiceMock;
};

export const UserStorageService = jest
  .fn()
  .mockImplementation(() => mockUserStorageService());

export default UserStorageService;
