import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AllExceptionFilter } from './api-utils/all-exception.filter';
import { ZodValidationExceptionFilter } from './api-utils/zod-vaidation-exception.filter';
import { AppModule } from './app.module';
import { GLOBAL_API_PREFIX } from './constants';

function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Chat Room Example')
    .setDescription('The Chat Room API description')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_API_PREFIX, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  patchNestJsSwagger();

  app.setGlobalPrefix(GLOBAL_API_PREFIX);

  app.useGlobalFilters(
    new ZodValidationExceptionFilter(),
    new AllExceptionFilter(),
  );

  app.enableVersioning({
    type: VersioningType.URI,
  });
  swaggerSetup(app);

  await app.listen(3000);
}

/**
 * BOOTSTRAP THE APP
 */

bootstrap()
  .then(() => {
    console.log('Application bootstraped successfully');
  })
  .catch((err) => {
    console.error(`Application bootstrap failed: ${err.message}`);
  });
