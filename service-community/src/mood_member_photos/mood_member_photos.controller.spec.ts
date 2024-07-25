import { Test, TestingModule } from '@nestjs/testing';
import { MoodMemberPhotosController } from './mood_member_photos.controller';
import { MoodMemberPhotosService } from './mood_member_photos.service';

describe('MoodMemberPhotosController', () => {
  let controller: MoodMemberPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodMemberPhotosController],
      providers: [MoodMemberPhotosService],
    }).compile();

    controller = module.get<MoodMemberPhotosController>(MoodMemberPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
