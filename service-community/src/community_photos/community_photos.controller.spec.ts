import { Test, TestingModule } from '@nestjs/testing';
import { CommunityPhotosController } from './community_photos.controller';
import { CommunityPhotosService } from './community_photos.service';

describe('CommunityPhotosController', () => {
  let controller: CommunityPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityPhotosController],
      providers: [CommunityPhotosService],
    }).compile();

    controller = module.get<CommunityPhotosController>(CommunityPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
