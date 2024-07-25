import { Test, TestingModule } from '@nestjs/testing';
import { MoodMemberFollowsService } from './mood_member_follows.service';

describe('MoodMemberFollowsService', () => {
  let service: MoodMemberFollowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodMemberFollowsService],
    }).compile();

    service = module.get<MoodMemberFollowsService>(MoodMemberFollowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
