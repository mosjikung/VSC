import { Test, TestingModule } from '@nestjs/testing';
import { MoodLocationsService } from './mood_locations.service';

describe('MoodLocationsService', () => {
  let service: MoodLocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodLocationsService],
    }).compile();

    service = module.get<MoodLocationsService>(MoodLocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
