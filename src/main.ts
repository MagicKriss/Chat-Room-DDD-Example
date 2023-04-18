import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GLOBAL_API_PREFIX } from './constants';

function swaggerSetup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Chat Room Example')
    .setDescription('The Chat Room API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_API_PREFIX, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_API_PREFIX);

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
