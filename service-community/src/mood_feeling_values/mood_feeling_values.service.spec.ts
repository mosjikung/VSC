import { Test, TestingModule } from '@nestjs/testing';
import { MoodFeelingValuesService } from './mood_feeling_values.service';

describe('MoodFeelingValuesService', () => {
  let service: MoodFeelingValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodFeelingValuesService],
    }).compile();

    service = module.get<MoodFeelingValuesService>(MoodFeelingValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
