import { Module } from '@nestjs/common';
import { MoodLocationActivitiesService } from './mood_location_activities.service';
import { MoodLocationActivitiesController } from './mood_location_activities.controller';

@Module({
  controllers: [MoodLocationActivitiesController],
  providers: [MoodLocationActivitiesService],
})
export class MoodLocationActivitiesModule {}
