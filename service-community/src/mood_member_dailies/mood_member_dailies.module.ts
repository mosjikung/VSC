import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodMemberDailiesService } from './mood_member_dailies.service';
import { MoodMemberDailiesController } from './mood_member_dailies.controller';
import { MoodMemberDaily } from './entities/mood_member_daily.entity';
import { MembersModule } from 'src/members/members.module';
import { MoodFeelingLevelsModule } from 'src/mood_feeling_levels/mood_feeling_levels.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoodMemberDaily]),
    MembersModule,
    MoodFeelingLevelsModule,
  ], // ต้องรวม Entity ที่ต้องการ
  controllers: [MoodMemberDailiesController],
  providers: [MoodMemberDailiesService],
  exports:[MoodMemberDailiesService]
})
export class MoodMemberDailiesModule {}
