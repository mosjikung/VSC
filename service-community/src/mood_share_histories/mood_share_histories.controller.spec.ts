import { Test, TestingModule } from '@nestjs/testing';
import { MoodShareHistoriesController } from './mood_share_histories.controller';
import { MoodShareHistoriesService } from './mood_share_histories.service';

describe('MoodShareHistoriesController', () => {
  let controller: MoodShareHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodShareHistoriesController],
      providers: [MoodShareHistoriesService],
    }).compile();

    controller = module.get<MoodShareHistoriesController>(MoodShareHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
