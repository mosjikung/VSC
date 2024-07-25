import { Module } from '@nestjs/common';
import { MoodMemberPhotosService } from './mood_member_photos.service';
import { MoodMemberPhotosController } from './mood_member_photos.controller';

@Module({
  controllers: [MoodMemberPhotosController],
  providers: [MoodMemberPhotosService],
})
export class MoodMemberPhotosModule {}
