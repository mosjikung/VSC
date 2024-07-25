import { Test, TestingModule } from '@nestjs/testing';
import { MemberObjectivesController } from './member_objectives.controller';
import { MemberObjectivesService } from './member_objectives.service';

describe('MemberObjectivesController', () => {
  let controller: MemberObjectivesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberObjectivesController],
      providers: [MemberObjectivesService],
    }).compile();

    controller = module.get<MemberObjectivesController>(MemberObjectivesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
