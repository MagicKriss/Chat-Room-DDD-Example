import { Injectable } from '@nestjs/common';
import { UserDTO, UserRequestDTO } from 'src/user/user.dto';
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

  async createUser(data: UserRequestDTO): Promise<UserDTO> {
    return this.prisma.user.create({
      data,
    });
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
