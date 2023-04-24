import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Err, Ok, Result } from 'src/api-utils/result.type';
import { UserDTO, UserRequestDTO } from 'src/user/user.dto';
import {
  FailedToCreateUserException,
  UserCreateException,
  UserEmailInUseException,
} from 'src/user/user.exceptions';
import { PrismaService } from '../prisma-service/prisma.service';
import { IUserStorage } from './user-storage.interface';

@Injectable()
export class UserStorageService implements IUserStorage {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number): Promise<UserDTO | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<UserDTO | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(
    data: UserRequestDTO,
  ): Promise<Result<UserDTO, UserCreateException>> {
    try {
      const newUser = await this.prisma.user.create({
        data,
      });
      return Ok(newUser);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        return Err(new UserEmailInUseException());
      }
      return Err(new FailedToCreateUserException());
    }
  }

  async userExistsById(id: number): Promise<boolean> {
    const user = await this.getUserById(id);
    return !!user;
  }

  async userExistsByEmail(email: string): Promise<boolean> {
    const user = await this.getUserByEmail(email);
    return !!user;
  }
}
