import { Test, TestingModule } from '@nestjs/testing';
import { MoodLocationActivitiesController } from './mood_location_activities.controller';
import { MoodLocationActivitiesService } from './mood_location_activities.service';

describe('MoodLocationActivitiesController', () => {
  let controller: MoodLocationActivitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodLocationActivitiesController],
      providers: [MoodLocationActivitiesService],
    }).compile();

    controller = module.get<MoodLocationActivitiesController>(MoodLocationActivitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
