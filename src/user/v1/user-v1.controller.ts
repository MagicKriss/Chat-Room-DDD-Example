import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessApiResponseDTO } from 'src/api-utils/api.responses';
import { USER_SERVICE } from '../user-service.factory';
import { IUserService } from '../user-service.interface';
import { UserDTO, UserRequestDTO } from '../user.dto';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserV1Controller {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  @ApiResponse({ status: 500, type: UserDTO })
  async createUser(
    @Body() user: UserRequestDTO,
  ): Promise<SuccessApiResponseDTO<UserDTO>> {
    const newUser = await this.userService.createUser(user);
    const response = new SuccessApiResponseDTO<UserDTO>()
      .setStatus(HttpStatus.CREATED)
      .setData(newUser);
    return response;
  }
}
