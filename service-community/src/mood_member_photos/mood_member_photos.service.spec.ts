import { Test, TestingModule } from '@nestjs/testing';
import { MoodMemberPhotosService } from './mood_member_photos.service';

describe('MoodMemberPhotosService', () => {
  let service: MoodMemberPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodMemberPhotosService],
    }).compile();

    service = module.get<MoodMemberPhotosService>(MoodMemberPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
