import { Test, TestingModule } from '@nestjs/testing';
import { MoodFeelingLevelsController } from './mood_feeling_levels.controller';
import { MoodFeelingLevelsService } from './mood_feeling_levels.service';

describe('MoodFeelingLevelsController', () => {
  let controller: MoodFeelingLevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodFeelingLevelsController],
      providers: [MoodFeelingLevelsService],
    }).compile();

    controller = module.get<MoodFeelingLevelsController>(MoodFeelingLevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
