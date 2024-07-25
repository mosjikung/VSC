import { Test, TestingModule } from '@nestjs/testing';
import { CommunityCommentHistoriesController } from './community_comment_histories.controller';
import { CommunityCommentHistoriesService } from './community_comment_histories.service';

describe('CommunityCommentHistoriesController', () => {
  let controller: CommunityCommentHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityCommentHistoriesController],
      providers: [CommunityCommentHistoriesService],
    }).compile();

    controller = module.get<CommunityCommentHistoriesController>(CommunityCommentHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
