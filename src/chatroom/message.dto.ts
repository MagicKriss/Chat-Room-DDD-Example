import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const MessageSchema = z.object({
  id: z.number().int().positive().describe('Unique identifier for the message'),
  message: z.string().describe('Message text'),
  senderId: z
    .number()
    .int()
    .positive()
    .describe('Unique identifier for the sender'),
  roomId: z.number().int().positive().describe('Unique identifier the room'),
  createdAt: z.date().describe('Date and time when the message was sent'),
});

// class is required for using DTO as a type in controller swagger decorators
export class MessageDto extends createZodDto(MessageSchema) {}

const SendMessageSchema = z.object({
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
  message: z.string().describe('Message text'),
});

export class SendMessageRequestDto extends createZodDto(SendMessageSchema) {}

const GetLatestMessagesSchema = z.object({
  roomId: z.number().int().positive().describe('Unique identifier the room'),
  count: z
    .number()
    .int()
    .positive()
    .max(100, 'Maximum number of messages to return is 100')
    .describe('Number of messages to return'),
});

export class GetLatestMessagesRequestDto extends createZodDto(
  GetLatestMessagesSchema,
) {}
