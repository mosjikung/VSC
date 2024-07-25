import { forwardRef, Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Members } from './entities/member.entity';
import { JwtService } from '@nestjs/jwt';
import { MoodLikeHistoriesModule } from 'src/mood_like_histories/mood_like_histories.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports:[Members,
  //   forwardRef(() => MoodLikeHistoriesModule)
  // ],
  imports: [
    TypeOrmModule.forFeature([Members]),
    forwardRef(() => MoodLikeHistoriesModule)
  ], // ต้องรวม Entity ที่ต้องการ
  controllers: [MembersController],
  providers: [MembersService,JwtService],
  exports:[MembersService]
})
export class MembersModule {}
