import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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
  ): Promise<ChatroomDTO> {
    const result = await this.chatroomService.createChatroom(chatroom);
    if (result.ok) {
      return result.value;
    }
    throw new BadRequestException(result.error.message);
  }

  @Post('add-user')
  @ApiResponse({ status: HttpStatus.CREATED, type: AddUserToRoomRequestDTO })
  async addUserToRoom(@Body() body: AddUserToRoomRequestDTO) {
    const result = await this.chatroomService.addUserToRoom(body);
    if (result.ok) {
      return result.value;
    }
    throw new BadRequestException(result.error.message);
  }

  @Post('send-message')
  async sendMessageToRoom(@Body() body: SendMessageRequestDto) {
    const result = await this.chatroomService.sendMessageToRoom(body);
    if (result.ok) {
      return result.value;
    }
    throw new BadRequestException(result.error.message);
  }

  @Get('get-latest-messages')
  @ApiResponse({ status: HttpStatus.OK, type: MessageDto, isArray: true })
  async getLatestRoomMessages(
    @Query('roomId') inputRoomId: number,
    @Query('count') inputCount: number,
  ) {
    const parsedRoomId = parseId(inputRoomId);
    if (!parsedRoomId.ok) {
      throw new BadRequestException(parsedRoomId.error);
    }
    const parsedCount = parseMessageCount(inputCount);
    if (!parsedCount.ok) {
      throw new BadRequestException(parsedCount.error);
    }

    const roomId = parsedRoomId.value;
    const count = parsedCount.value;
    const result = await this.chatroomService.getLatestRoomMessages(
      roomId,
      count,
    );
    if (result.ok) {
      return result.value;
    }
    throw new BadRequestException(result.error.message);
  }
}
