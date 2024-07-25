import { Test, TestingModule } from '@nestjs/testing';
import { MoodLocationActivitiesService } from './mood_location_activities.service';

describe('MoodLocationActivitiesService', () => {
  let service: MoodLocationActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodLocationActivitiesService],
    }).compile();

    service = module.get<MoodLocationActivitiesService>(MoodLocationActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
