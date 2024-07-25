import { Test, TestingModule } from '@nestjs/testing';
import { MoodShareHistoriesService } from './mood_share_histories.service';

describe('MoodShareHistoriesService', () => {
  let service: MoodShareHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodShareHistoriesService],
    }).compile();

    service = module.get<MoodShareHistoriesService>(MoodShareHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
