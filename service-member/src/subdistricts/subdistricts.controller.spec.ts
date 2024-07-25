import { Test, TestingModule } from '@nestjs/testing';
import { SubdistrictsController } from './subdistricts.controller';
import { SubdistrictsService } from './subdistricts.service';

describe('SubdistrictsController', () => {
  let controller: SubdistrictsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdistrictsController],
      providers: [SubdistrictsService],
    }).compile();

    controller = module.get<SubdistrictsController>(SubdistrictsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
