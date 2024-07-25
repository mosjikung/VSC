import { Test, TestingModule } from '@nestjs/testing';
import { CommunityLikeHistoriesService } from './community_like_histories.service';

describe('CommunityLikeHistoriesService', () => {
  let service: CommunityLikeHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityLikeHistoriesService],
    }).compile();

    service = module.get<CommunityLikeHistoriesService>(CommunityLikeHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
