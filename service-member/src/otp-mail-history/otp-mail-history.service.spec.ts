import { Test, TestingModule } from '@nestjs/testing';
import { OtpMailHistoryService } from './otp-mail-history.service';

describe('OtpMailHistoryService', () => {
  let service: OtpMailHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpMailHistoryService],
    }).compile();

    service = module.get<OtpMailHistoryService>(OtpMailHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
