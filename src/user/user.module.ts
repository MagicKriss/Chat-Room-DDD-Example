import { Module } from '@nestjs/common';
import { StorageModule } from 'src/storage/storage.module';
import { USER_SERVICE, userServiceFactory } from './user-service.factory';
import { UserService } from './user.service';
import { UserV1Controller } from './v1/user-v1.controller';

@Module({
  controllers: [UserV1Controller],
  imports: [StorageModule],
  providers: [userServiceFactory, UserService],
  exports: [USER_SERVICE, UserService],
})
export class UserModule {}
