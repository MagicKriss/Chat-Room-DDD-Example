import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const ChatroomBaseSchema = z.object({
  name: z.string().describe('Name of the chatroom'),
});

const CreatedChatroomSchema = ChatroomBaseSchema.extend({
  id: z.number().int().describe('Unique identifier for the chatroom'),
});

// class is required for using DTO as a type in controller swagger decorators
export class CreateChatroomRequestDTO extends createZodDto(
  ChatroomBaseSchema,
) {}
export class ChatroomDTO extends createZodDto(CreatedChatroomSchema) {}

const AddUserToRoomSchema = z.object({
  userId: z
    .number()
    .int()
    .positive()
    .describe('Unique identifier for the user'),
  roomId: z
    .number()
    .int()
    .positive()
    .describe('Unique identifier for the chatroom'),
});

export class AddUserToRoomRequestDTO extends createZodDto(
  AddUserToRoomSchema,
) {}
