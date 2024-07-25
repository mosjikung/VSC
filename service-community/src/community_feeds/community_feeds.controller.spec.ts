import { Test, TestingModule } from '@nestjs/testing';
import { CommunityFeedsController } from './community_feeds.controller';
import { CommunityFeedsService } from './community_feeds.service';

describe('CommunityFeedsController', () => {
  let controller: CommunityFeedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityFeedsController],
      providers: [CommunityFeedsService],
    }).compile();

    controller = module.get<CommunityFeedsController>(CommunityFeedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
