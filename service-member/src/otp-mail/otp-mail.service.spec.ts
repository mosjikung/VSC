import { Test, TestingModule } from '@nestjs/testing';
import { OtpMailService } from './otp-mail.service';

describe('OtpMailService', () => {
  let service: OtpMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpMailService],
    }).compile();

    service = module.get<OtpMailService>(OtpMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
