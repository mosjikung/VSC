import { Module } from '@nestjs/common';
import { MoodShareHistoriesService } from './mood_share_histories.service';
import { MoodShareHistoriesController } from './mood_share_histories.controller';

@Module({
  controllers: [MoodShareHistoriesController],
  providers: [MoodShareHistoriesService],
})
export class MoodShareHistoriesModule {}
