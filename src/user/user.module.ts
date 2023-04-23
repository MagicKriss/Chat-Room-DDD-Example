import { Module } from '@nestjs/common';
import { UserV1Controller } from './v1/user-v1.controller';

@Module({
  controllers: [UserV1Controller],
})
export class UserModule {}
