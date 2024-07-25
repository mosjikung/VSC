import { Test, TestingModule } from '@nestjs/testing';
import { MoodMemberFollowsController } from './mood_member_follows.controller';
import { MoodMemberFollowsService } from './mood_member_follows.service';

describe('MoodMemberFollowsController', () => {
  let controller: MoodMemberFollowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodMemberFollowsController],
      providers: [MoodMemberFollowsService],
    }).compile();

    controller = module.get<MoodMemberFollowsController>(MoodMemberFollowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
