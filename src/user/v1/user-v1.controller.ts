import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { USER_SERVICE } from '../user-service.factory';
import { IUserService } from '../user-service.interface';
import {
  UserDTO,
  UserRequestDTO,
  parseUserEmail,
  parseUserId,
} from '../user.dto';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserV1Controller {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post('new')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDTO })
  async createUser(@Body() user: UserRequestDTO): Promise<UserDTO> {
    const result = await this.userService.createUser(user);
    if (result.ok) {
      return result.value;
    }
    throw new BadRequestException(result.error.message);
  }

  @Get('get-by-id')
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  async getUserById(@Query('id') inputId: number): Promise<UserDTO> {
    const parsedId = parseUserId(inputId);

    if (!parsedId.ok) {
      throw new BadRequestException(parsedId.error);
    }
    const id = parsedId.value;
    const result = await this.userService.getUserById(id);
    if (result.ok) {
      return result.value;
    }
    throw new NotFoundException(result.error.message);
  }

  @Get('get-by-email')
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  async getUserByEmail(@Query('email') inputEmail: string) {
    const parsedEmail = parseUserEmail(inputEmail);
    if (!parsedEmail.ok) {
      throw new BadRequestException(parsedEmail.error);
    }
    const email = parsedEmail.value;

    const result = await this.userService.getUserByEmail(email);
    if (result.ok) {
      return result.value;
    }
    throw new NotFoundException(result.error.message);
  }
}
