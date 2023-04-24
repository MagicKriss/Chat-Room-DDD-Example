import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { parseQueryParam } from 'src/api-utils/validation.utils';

const UserBaseSchema = z.object({
  username: z.string().describe('Username of the user'),
  email: z.string().email().describe('Unique email of the user'),
});
const CreatedUserSchema = UserBaseSchema.extend({
  id: z.number().int().describe('Unique identifier for the user'),
});

// class is required for using DTO as a type in controller swagger decorators
export class UserRequestDTO extends createZodDto(UserBaseSchema) {}
export class UserDTO extends createZodDto(CreatedUserSchema) {}

export const UserIdParser = z.preprocess(
  (val) => Number(val),
  z.number().positive(),
);

export const parseUserId = (id: unknown) => parseQueryParam(UserIdParser, id);

export const UserEmailParser = z.string().email();

export const parseUserEmail = (id: unknown) =>
  parseQueryParam(UserEmailParser, id);
