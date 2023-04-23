import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessApiResponseDTO } from 'src/api-utils/api.responses';
import { UserDTO, UserRequestDTO } from '../User.dto';

@ApiTags('user')
@Controller({ path: 'user', version: '1' })
export class UserV1Controller {
  @Post()
  @ApiResponse({ status: 500, type: UserDTO })
  createUser(@Body() user: UserRequestDTO): SuccessApiResponseDTO<UserDTO> {
    // TODO implement create user
    const response = new SuccessApiResponseDTO<UserDTO>()
      .setStatus(HttpStatus.CREATED)
      .setData({ ...user, id: 1 });
    return response;
  }
}
