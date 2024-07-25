import { Test, TestingModule } from '@nestjs/testing';
import { MoodLikeHistoriesService } from './mood_like_histories.service';

describe('MoodLikeHistoriesService', () => {
  let service: MoodLikeHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodLikeHistoriesService],
    }).compile();

    service = module.get<MoodLikeHistoriesService>(MoodLikeHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
