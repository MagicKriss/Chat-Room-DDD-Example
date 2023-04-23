import { Injectable } from '@nestjs/common';
import { UserDTO, UserRequestDTO } from 'src/user/user.dto';
import { PrismaService } from '../prisma-service/prisma.service';
import { IUserStorage } from './user-storage.interface';

@Injectable()
export class UserStorageService implements IUserStorage {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(id: number): Promise<UserDTO | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });
    return prismaUser;
  }

  async createUser(data: UserRequestDTO): Promise<UserDTO> {
    return this.prisma.user.create({
      data,
    });
  }

  async userExists(id: number): Promise<boolean> {
    const user = await this.getUser(id);
    return !!user;
  }
}
