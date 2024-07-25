import { Test, TestingModule } from '@nestjs/testing';
import { MoodMemberDailiesController } from './mood_member_dailies.controller';
import { MoodMemberDailiesService } from './mood_member_dailies.service';

describe('MoodMemberDailiesController', () => {
  let controller: MoodMemberDailiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodMemberDailiesController],
      providers: [MoodMemberDailiesService],
    }).compile();

    controller = module.get<MoodMemberDailiesController>(MoodMemberDailiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
