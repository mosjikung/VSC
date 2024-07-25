import { Module } from '@nestjs/common';
import { CommunityTypesService } from './community_types.service';
import { CommunityTypesController } from './community_types.controller';

@Module({
  controllers: [CommunityTypesController],
  providers: [CommunityTypesService],
})
export class CommunityTypesModule {}
