import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc'; // import UTC plugin
import * as timezone from 'dayjs/plugin/timezone'; // import timezone plugin

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('VSC-API')
    .setDescription('SERVICE COMMUNITY API')
    .setVersion('1.0')
    .addTag('SERVICE COMMUNITY') // Optional: Add tags for better organization
    .addBearerAuth()
    .addServer(process.env.SWAGGER_BASE_URI)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');
  
  await app.listen(process.env.SERVICE_COMMUNITY_API_PORT || 3503);
}
bootstrap();
