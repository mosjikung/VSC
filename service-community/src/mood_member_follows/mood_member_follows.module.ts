import { Module } from '@nestjs/common';
import { MoodMemberFollowsService } from './mood_member_follows.service';
import { MoodMemberFollowsController } from './mood_member_follows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodMemberFollow } from './entities/mood_member_follow.entity';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoodMemberFollow]),
    MembersModule
  ], // ต้องรวม Entity ที่ต้องการ
  controllers: [MoodMemberFollowsController],
  providers: [MoodMemberFollowsService],
})
export class MoodMemberFollowsModule {}
