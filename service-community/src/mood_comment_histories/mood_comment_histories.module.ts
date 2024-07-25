import { Module } from '@nestjs/common';
import { MoodCommentHistoriesService } from './mood_comment_histories.service';
import { MoodCommentHistoriesController } from './mood_comment_histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodCommentHistory } from './entities/mood_comment_history.entity';
import { MoodMemberDailiesModule } from 'src/mood_member_dailies/mood_member_dailies.module';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoodCommentHistory]),
    MoodMemberDailiesModule,
    MembersModule
  ], // ต้องรวม Entity ที่ต้องการ
  controllers: [MoodCommentHistoriesController],
  providers: [MoodCommentHistoriesService],
})
export class MoodCommentHistoriesModule {}
