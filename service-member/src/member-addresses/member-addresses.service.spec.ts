import { Test, TestingModule } from '@nestjs/testing';
import { MemberAddressesService } from './member-addresses.service';

describe('MemberAddressesService', () => {
  let service: MemberAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberAddressesService],
    }).compile();

    service = module.get<MemberAddressesService>(MemberAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
