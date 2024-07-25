import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { MembersModule } from './members/members.module';

import { MoodMemberDailiesModule } from './mood_member_dailies/mood_member_dailies.module';
import { MoodMemberPhotosModule } from './mood_member_photos/mood_member_photos.module';
import { MoodMemberFollowsModule } from './mood_member_follows/mood_member_follows.module';

import { MoodCommentHistoriesModule } from './mood_comment_histories/mood_comment_histories.module';
import { MoodFeelingLevelsModule } from './mood_feeling_levels/mood_feeling_levels.module';
import { MoodFeelingValuesModule } from './mood_feeling_values/mood_feeling_values.module';
import { MoodLikeHistoriesModule } from './mood_like_histories/mood_like_histories.module';
import { MoodLocationActivitiesModule } from './mood_location_activities/mood_location_activities.module';
import { MoodLocationsModule } from './mood_locations/mood_locations.module';
import { MoodShareHistoriesModule } from './mood_share_histories/mood_share_histories.module';

import { CommunityTypesModule } from './community_types/community_types.module';
import { CommunityFeedsModule } from './community_feeds/community_feeds.module';
import { CommunityPhotosModule } from './community_photos/community_photos.module';
import { CommunityCommentHistoriesModule } from './community_comment_histories/community_comment_histories.module';
import { CommunityLikeHistoriesModule } from './community_like_histories/community_like_histories.module';
import { minioClientOptions } from './config/minio.config';
import { MinioModule } from './minio/minio.module';
import * as Minio from 'minio'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: process.env.SERVICE_API_JWT_SECRET,
        signOptions: {
          expiresIn: process.env.SERVICE_API_JWT_EXPIRATION_TIME,
        },
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SERVICE_API_POSTGRES_HOST,
      port: parseInt(<string>process.env.SERVICE_API_POSTGRES_PORT),
      username: process.env.SERVICE_API_POSTGRES_USER,
      password: process.env.SERVICE_API_POSTGRES_PASSWORD,
      database: process.env.SERVICE_API_POSTGRES_DATABASE,
      // entities: [User],
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    MembersModule,
    MoodMemberDailiesModule,
    MoodMemberPhotosModule,
    MoodMemberFollowsModule,
    MoodCommentHistoriesModule,
    MoodFeelingLevelsModule,
    MoodFeelingValuesModule,
    MoodLikeHistoriesModule,
    MoodLocationActivitiesModule,
    MoodLocationsModule,
    MoodShareHistoriesModule,
    MinioModule,

    CommunityTypesModule,
    CommunityFeedsModule,
    CommunityPhotosModule,
    CommunityCommentHistoriesModule,
    CommunityLikeHistoriesModule,

  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: 'MINIO_CLIENT',
      useFactory: () => new Minio.Client(minioClientOptions),
    },
    AppService,
  ],
})
export class AppModule {}
