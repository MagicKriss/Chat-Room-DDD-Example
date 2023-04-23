import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const UserBaseSchema = z.object({
  username: z.string().describe('Username of the user'),
});
const CreatedUserSchema = UserBaseSchema.extend({
  id: z.number().int().describe('Unique identifier for the user'),
});

// class is required for using DTO as a type in controller swagger decorators
export class UserRequestDTO extends createZodDto(UserBaseSchema) {}
export class UserDTO extends createZodDto(CreatedUserSchema) {}
