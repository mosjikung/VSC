import { Test, TestingModule } from '@nestjs/testing';
import { CommunityFeedsService } from './community_feeds.service';

describe('CommunityFeedsService', () => {
  let service: CommunityFeedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityFeedsService],
    }).compile();

    service = module.get<CommunityFeedsService>(CommunityFeedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
