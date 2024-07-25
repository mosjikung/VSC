import { Test, TestingModule } from '@nestjs/testing';
import { MoodLikeHistoriesController } from './mood_like_histories.controller';
import { MoodLikeHistoriesService } from './mood_like_histories.service';

describe('MoodLikeHistoriesController', () => {
  let controller: MoodLikeHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodLikeHistoriesController],
      providers: [MoodLikeHistoriesService],
    }).compile();

    controller = module.get<MoodLikeHistoriesController>(MoodLikeHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
