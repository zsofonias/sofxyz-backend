import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const APP_NAME = configService.getOrThrow<string>('app.name');
  const BASE_URL = configService.getOrThrow<string>('app.baseUrl');
  const PORT = configService.getOrThrow<number>('app.port');

  /**
   * Set Api Prefix
   */
  app.setGlobalPrefix('api');

  /**
   * Versioning
   */
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  /**
   * Documentation Config
   */
  const docConfig = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(`Use ${BASE_URL} as baseUrl for all endpoints`)
    .setVersion('1.0')
    .addServer(BASE_URL)
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT);
}
bootstrap();
