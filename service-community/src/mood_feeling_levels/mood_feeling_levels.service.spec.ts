import { Test, TestingModule } from '@nestjs/testing';
import { MoodFeelingLevelsService } from './mood_feeling_levels.service';

describe('MoodFeelingLevelsService', () => {
  let service: MoodFeelingLevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodFeelingLevelsService],
    }).compile();

    service = module.get<MoodFeelingLevelsService>(MoodFeelingLevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
