import { Test, TestingModule } from '@nestjs/testing';
import { MoodMemberDailiesService } from './mood_member_dailies.service';

describe('MoodMemberDailiesService', () => {
  let service: MoodMemberDailiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodMemberDailiesService],
    }).compile();

    service = module.get<MoodMemberDailiesService>(MoodMemberDailiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
