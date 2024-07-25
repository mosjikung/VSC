import { Module } from '@nestjs/common';
import { CommunityLikeHistoriesService } from './community_like_histories.service';
import { CommunityLikeHistoriesController } from './community_like_histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityLikeHistory } from './entities/community_like_history.entity';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityLikeHistory]), MembersModule], // ต้องรวม Entity ที่ต้องการ
  controllers: [CommunityLikeHistoriesController],
  providers: [CommunityLikeHistoriesService],
})
export class CommunityLikeHistoriesModule {}
