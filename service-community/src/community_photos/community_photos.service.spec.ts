import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPhotosService } from './community_photos.service';

describe('CommunityPhotosService', () => {
  let service: CommunityPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityPhotosService],
    }).compile();

    service = module.get<CommunityPhotosService>(CommunityPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
