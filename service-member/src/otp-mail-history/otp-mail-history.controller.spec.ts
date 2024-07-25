import { Test, TestingModule } from '@nestjs/testing';
import { OtpHistoryController } from './otp-mail-history.controller';
import { OtpHistoryService } from './otp-mail-history.service';

describe('OtpHistoryController', () => {
  let controller: OtpHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpHistoryController],
      providers: [OtpHistoryService],
    }).compile();

    controller = module.get<OtpHistoryController>(OtpHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
