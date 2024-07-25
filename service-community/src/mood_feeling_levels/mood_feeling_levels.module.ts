import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodFeelingLevelsService } from './mood_feeling_levels.service';
import { MoodFeelingLevelsController } from './mood_feeling_levels.controller';
import { MoodFeelingLevel } from './entities/mood_feeling_level.entity';
import { MembersModule } from 'src/members/members.module';
import { MoodMemberDailiesService } from 'src/mood_member_dailies/mood_member_dailies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoodFeelingLevel]),
    MembersModule
  ],
  controllers: [MoodFeelingLevelsController],
  providers: [MoodFeelingLevelsService],
  exports:[MoodFeelingLevelsService]
})
export class MoodFeelingLevelsModule {}
