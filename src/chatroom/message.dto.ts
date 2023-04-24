import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { parseQueryParam } from 'src/api-utils/validation.utils';

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

const IdParser = z.preprocess(
  (val) => Number(val),
  z.number().int().positive().describe('Unique identifier'),
);

const MessageCountParser = z.preprocess(
  (val) => Number(val),
  z
    .number()
    .int()
    .positive()
    .max(100, 'Maximum number of messages to return is 100')
    .default(10)
    .describe('Number of messages to return'),
);

export const parseId = (id: unknown) => parseQueryParam(IdParser, id);
export const parseMessageCount = (count: unknown) =>
  parseQueryParam(MessageCountParser, count);
