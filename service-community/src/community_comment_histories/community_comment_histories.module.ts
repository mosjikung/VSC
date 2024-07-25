import { Module } from '@nestjs/common';
import { CommunityCommentHistoriesService } from './community_comment_histories.service';
import { CommunityCommentHistoriesController } from './community_comment_histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityCommentHistory } from './entities/community_comment_history.entity';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommunityCommentHistory]), MembersModule], // ต้องรวม Entity ที่ต้องการ
  controllers: [CommunityCommentHistoriesController],
  providers: [CommunityCommentHistoriesService],
})
export class CommunityCommentHistoriesModule {}
