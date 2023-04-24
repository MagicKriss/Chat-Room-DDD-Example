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
import {
  AddUserToRoomRequestDTO,
  ChatroomDTO,
  CreateChatroomRequestDTO,
} from '../chatroom.dto';
import {
  MessageDto,
  SendMessageRequestDto,
  parseId,
  parseMessageCount,
} from '../message.dto';

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

  @Post('add-user')
  @ApiResponse({ status: HttpStatus.CREATED, type: AddUserToRoomRequestDTO })
  async addUserToRoom(@Body() body: AddUserToRoomRequestDTO) {
    const result = await this.chatroomService.addUserToRoom(body);
    if (result.ok) {
      const response = new SuccessApiResponseDTO<boolean>()
        .setStatus(HttpStatus.CREATED)
        .setData(result.value);
      return response;
    }
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }

  @Post('send-message')
  async sendMessageToRoom(@Body() body: SendMessageRequestDto) {
    const result = await this.chatroomService.sendMessageToRoom(body);
    if (result.ok) {
      const response = new SuccessApiResponseDTO<MessageDto>()
        .setStatus(HttpStatus.CREATED)
        .setData(result.value);
      return response;
    }
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }

  @Get('get-latest-messages')
  @ApiResponse({ status: HttpStatus.OK, type: MessageDto, isArray: true })
  async getLatestRoomMessages(
    @Query('roomId') inputRoomId: number,
    @Query('count') inputCount: number,
  ) {
    const parsedRoomId = parseId(inputRoomId);
    if (!parsedRoomId.ok) {
      const response = new ErrorApiResponseDTO()
        .setStatus(HttpStatus.BAD_REQUEST)
        .setMessage(parsedRoomId.error);
      return response;
    }
    const parsedCount = parseMessageCount(inputCount);
    if (!parsedCount.ok) {
      const response = new ErrorApiResponseDTO()
        .setStatus(HttpStatus.BAD_REQUEST)
        .setMessage(parsedCount.error);
      return response;
    }

    const roomId = parsedRoomId.value;
    const count = parsedCount.value;
    const result = await this.chatroomService.getLatestRoomMessages(
      roomId,
      count,
    );
    if (result.ok) {
      const response = new SuccessApiResponseDTO<MessageDto[]>()
        .setStatus(HttpStatus.OK)
        .setData(result.value);
      return response;
    }
    const response = new ErrorApiResponseDTO()
      .setStatus(HttpStatus.BAD_REQUEST)
      .setMessage(result.error.message);
    return response;
  }
}
