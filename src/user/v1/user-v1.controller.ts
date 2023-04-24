import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ErrorApiResponseDTO,
  SuccessApiResponseDTO,
} from 'src/api-utils/api.responses';
import { USER_SERVICE } from '../user-service.factory';
import { IUserService } from '../user-service.interface';
import { UserDTO, UserRequestDTO } from '../user.dto';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserV1Controller {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post('new')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDTO })
  async createUser(
    @Body() user: UserRequestDTO,
  ): Promise<SuccessApiResponseDTO<UserDTO> | ErrorApiResponseDTO> {
    const result = await this.userService.createUser(user);
    if (result.ok) {
      const response = new SuccessApiResponseDTO<UserDTO>()
        .setStatus(HttpStatus.CREATED)
        .setData(result.value);
      return response;
    }
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }

  @Get('get-by-id')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDTO })
  async getUserById(
    @Param() id: number,
  ): Promise<SuccessApiResponseDTO<UserDTO> | ErrorApiResponseDTO> {
    const result = await this.userService.getUserById(id);
    if (result.ok) {
      const response = new SuccessApiResponseDTO<UserDTO>()
        .setStatus(HttpStatus.CREATED)
        .setData(result.value);
      return response;
    }
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }
}
