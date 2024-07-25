import { Test, TestingModule } from '@nestjs/testing';
import { MoodLocationsController } from './mood_locations.controller';
import { MoodLocationsService } from './mood_locations.service';

describe('MoodLocationsController', () => {
  let controller: MoodLocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodLocationsController],
      providers: [MoodLocationsService],
    }).compile();

    controller = module.get<MoodLocationsController>(MoodLocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
