import { Test, TestingModule } from '@nestjs/testing';
import { MoodCommentHistoriesController } from './mood_comment_histories.controller';
import { MoodCommentHistoriesService } from './mood_comment_histories.service';

describe('MoodCommentHistoriesController', () => {
  let controller: MoodCommentHistoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodCommentHistoriesController],
      providers: [MoodCommentHistoriesService],
    }).compile();

    controller = module.get<MoodCommentHistoriesController>(MoodCommentHistoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
