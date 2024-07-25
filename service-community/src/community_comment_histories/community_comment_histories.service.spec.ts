import { Test, TestingModule } from '@nestjs/testing';
import { CommunityCommentHistoriesService } from './community_comment_histories.service';

describe('CommunityCommentHistoriesService', () => {
  let service: CommunityCommentHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityCommentHistoriesService],
    }).compile();

    service = module.get<CommunityCommentHistoriesService>(CommunityCommentHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
