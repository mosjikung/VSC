import { Test, TestingModule } from '@nestjs/testing';
import { CommunityTypesController } from './community_types.controller';
import { CommunityTypesService } from './community_types.service';

describe('CommunityTypesController', () => {
  let controller: CommunityTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityTypesController],
      providers: [CommunityTypesService],
    }).compile();

    controller = module.get<CommunityTypesController>(CommunityTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
