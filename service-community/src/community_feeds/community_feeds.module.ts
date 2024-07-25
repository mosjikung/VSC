import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MembersModule } from 'src/members/members.module';
import { CommunityFeedsService } from './community_feeds.service';
import { CommunityFeedsController } from './community_feeds.controller';
import { CommunityFeed } from './entities/community_feed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityFeed]),
    MembersModule
  ], // ต้องรวม Entity ที่ต้องการ  
  controllers: [CommunityFeedsController],
  providers: [CommunityFeedsService],
})
export class CommunityFeedsModule {}
