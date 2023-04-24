import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const MessageSchema = z.object({
  id: z.number().int().describe('Unique identifier for the message'),
  message: z.string().describe('Message text'),
  senderId: z.number().int().describe('Unique identifier for the sender'),
  createdAt: z.date().describe('Date and time when the message was sent'),
});

// class is required for using DTO as a type in controller swagger decorators
export class MessageDto extends createZodDto(MessageSchema) {}
