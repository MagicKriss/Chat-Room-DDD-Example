import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { StorageModule } from './storage/storage.module';
import { UserModule } from './user/user.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true }),
    UserModule,
    StorageModule,
  ],
  controllers: [],
})
export class AppModule {}
