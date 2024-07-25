import { Test, TestingModule } from '@nestjs/testing';
import { MemberObjectivesService } from './member_objectives.service';

describe('MemberObjectivesService', () => {
  let service: MemberObjectivesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberObjectivesService],
    }).compile();

    service = module.get<MemberObjectivesService>(MemberObjectivesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
