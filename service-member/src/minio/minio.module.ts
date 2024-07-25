import { forwardRef, Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { minioClientOptions } from 'src/config/minio.config';
import * as Minio from 'minio';
import { MinioGlobalService } from './minio-global.service';
import { Members } from 'src/members/entities/member.entity';

@Module({
  imports: [forwardRef(() => Members)], // Import ProductImagesModule
  controllers: [MinioController],
  providers: [
    MinioService,
    MinioGlobalService,
    {
      provide: 'MINIO_CLIENT',
      useFactory: () => new Minio.Client(minioClientOptions),
    },
  ],
  exports: [MinioService,MinioGlobalService],
})
export class MinioModule {}
