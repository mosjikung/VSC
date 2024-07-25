import { Test, TestingModule } from '@nestjs/testing';
import { OtpMailController } from './otp-mail.controller';
import { OtpMailService } from './otp-mail.service';

describe('OtpMailController', () => {
  let controller: OtpMailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpMailController],
      providers: [OtpMailService],
    }).compile();

    controller = module.get<OtpMailController>(OtpMailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
