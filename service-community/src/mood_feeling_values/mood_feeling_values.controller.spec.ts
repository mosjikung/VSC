import { Test, TestingModule } from '@nestjs/testing';
import { MoodFeelingValuesController } from './mood_feeling_values.controller';
import { MoodFeelingValuesService } from './mood_feeling_values.service';

describe('MoodFeelingValuesController', () => {
  let controller: MoodFeelingValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodFeelingValuesController],
      providers: [MoodFeelingValuesService],
    }).compile();

    controller = module.get<MoodFeelingValuesController>(MoodFeelingValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
