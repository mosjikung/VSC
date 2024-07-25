import { Test, TestingModule } from '@nestjs/testing';
import { CommunityLikeHistoriesController } from './community_like_histories.controller';
import { CommunityLikeHistoriesService } from './community_like_histories.service';

describe('CommunityLikeHistoriesController', () => {
  let controller: CommunityLikeHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityLikeHistoriesController],
      providers: [CommunityLikeHistoriesService],
    }).compile();

    controller = module.get<CommunityLikeHistoriesController>(CommunityLikeHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
