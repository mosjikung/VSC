import { forwardRef, Module } from '@nestjs/common';
import { MoodLikeHistoriesService } from './mood_like_histories.service';
import { MoodLikeHistoriesController } from './mood_like_histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoodLikeHistory } from './entities/mood_like_history.entity';
import { JwtDecoderService } from 'src/utility/jwtdecode';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MoodLikeHistory])
    ,forwardRef(() => MembersModule)
  ],
  controllers: [MoodLikeHistoriesController],
  providers: [MoodLikeHistoriesService],
})
export class MoodLikeHistoriesModule {}
