import { Test, TestingModule } from '@nestjs/testing';
import { MoodCommentHistoriesService } from './mood_comment_histories.service';

describe('MoodCommentHistoriesService', () => {
  let service: MoodCommentHistoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodCommentHistoriesService],
    }).compile();

    service = module.get<MoodCommentHistoriesService>(MoodCommentHistoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
