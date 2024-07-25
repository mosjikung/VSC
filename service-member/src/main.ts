import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc'; // import UTC plugin
import * as timezone from 'dayjs/plugin/timezone'; // import timezone plugin

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  let swaggerServer = `http://localhost:${process.env.SERVICE_STORE_API_PORT || 3501}`;
  if (process.env.NODE_ENV === 'production') {
    swaggerServer = process.env.SWAGGER_BASE_URI || 'http://localhost:3501';
  }
    
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('VSC-API')
    .setDescription('SERVICE MEMBER API')
    .setVersion('1.0')
    .addTag('SERVICE MEMBER') // Optional: Add tags for better organization
    .addBearerAuth()
    .addServer(swaggerServer)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');
  
  await app.listen(process.env.SERVICE_MEMBER_API_PORT || 3501);
}
bootstrap();
