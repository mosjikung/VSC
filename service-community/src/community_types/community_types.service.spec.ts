import { Test, TestingModule } from '@nestjs/testing';
import { CommunityTypesService } from './community_types.service';

describe('CommunityTypesService', () => {
  let service: CommunityTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityTypesService],
    }).compile();

    service = module.get<CommunityTypesService>(CommunityTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
