import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ErrorApiResponseDTO,
  SuccessApiResponseDTO,
} from 'src/api-utils/api.responses';
import { CHATROOM_SERVICE } from '../chatroom-service.factory';
import { IChatroomService } from '../chatroom-service.interface';
import { ChatroomDTO, CreateChatroomRequestDTO } from '../chatroom.dto';
import { MessageDto } from '../message.dto';

@ApiTags('chat')
@Controller({ path: 'chat', version: '1' })
export class ChatroomV1Controller {
  constructor(
    @Inject(CHATROOM_SERVICE)
    private readonly chatroomService: IChatroomService,
  ) {}

  @Post('new')
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateChatroomRequestDTO })
  async createChatroom(
    @Body() chatroom: CreateChatroomRequestDTO,
  ): Promise<SuccessApiResponseDTO<ChatroomDTO> | ErrorApiResponseDTO> {
    const newRoomResult = await this.chatroomService.createChatroom(chatroom);
    if (newRoomResult.ok) {
      const response = new SuccessApiResponseDTO<ChatroomDTO>()
        .setStatus(HttpStatus.CREATED)
        .setData(newRoomResult.value);
      return response;
    } else {
      const response = new ErrorApiResponseDTO()
        .setStatus(HttpStatus.BAD_REQUEST)
        .setMessage(newRoomResult.error.message);
      return response;
    }
  }

  //  Add User To Room
  @Post('add-user')
  async addUserToRoom(
    @Body('userId') userId: number,
    @Body('roomId') roomId: number,
  ) {
    const result = await this.chatroomService.addUserToRoom(userId, roomId);
    if (result.ok) {
      const response = new SuccessApiResponseDTO<boolean>()
        .setStatus(HttpStatus.CREATED)
        .setData(result.value);
      return response;
    }
    // Success
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }

  @Post('send-message')
  async sendMessageToRoom(
    @Body('userId') userId: number,
    @Body('roomId') roomId: number,
    @Body('message') message: string,
  ) {
    const result = await this.chatroomService.sendMessageToRoom(
      userId,
      roomId,
      message,
    );
    if (result.ok) {
      const response = new SuccessApiResponseDTO<MessageDto>()
        .setStatus(HttpStatus.CREATED)
        .setData(result.value);
      return response;
    }
    // Success
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }

  @Get('get-latest-messages')
  async getLatestRoomMessages(
    @Query('roomId') roomId: number,
    @Query('count') count: number,
  ) {
    const result = await this.chatroomService.getLatestRoomMessages(
      roomId,
      count,
    );
    if (result.ok) {
      const response = new SuccessApiResponseDTO<MessageDto[]>()
        .setStatus(HttpStatus.CREATED)
        .setData(result.value);
      return response;
    }
    // Success
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }
}
