import { Module } from '@nestjs/common';
import { MoodLocationsService } from './mood_locations.service';
import { MoodLocationsController } from './mood_locations.controller';

@Module({
  controllers: [MoodLocationsController],
  providers: [MoodLocationsService],
})
export class MoodLocationsModule {}
