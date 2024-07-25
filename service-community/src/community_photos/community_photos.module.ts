import { forwardRef, Module } from '@nestjs/common';
import { CommunityPhotosService } from './community_photos.service';
import { CommunityPhotosController } from './community_photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityPhoto } from './entities/community_photo.entity';
import { MinioModule } from 'src/minio/minio.module';
import { minioClientOptions } from 'src/config/minio.config';
import * as Minio from 'minio';

@Module({
  imports:[TypeOrmModule.forFeature([CommunityPhoto]),
    forwardRef(() => MinioModule)
  ],
  controllers: [CommunityPhotosController],
  providers: [CommunityPhotosService,
    {
      provide: 'MINIO_CLIENT',
      useFactory: () => new Minio.Client(minioClientOptions),
    },
  ],
})
export class CommunityPhotosModule {}