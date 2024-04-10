import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/all.exception';
import { CustomValidationPipe } from './pipe/custom-validation.pipe';

export let app: INestApplication;

async function bootstrap() {
  const PORT = process.env.PORT || 8090;
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);

  const config = new DocumentBuilder()
    .setTitle('Article Manager API')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('Nets.js PostgresSQL TypeORM')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEADER', 'PATCH', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionsFilter({ httpAdapter }));
  app.useGlobalPipes(new CustomValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
