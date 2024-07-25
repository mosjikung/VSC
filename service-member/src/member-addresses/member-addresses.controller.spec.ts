import { Test, TestingModule } from '@nestjs/testing';
import { MemberAddressesController } from './member-addresses.controller';
import { MemberAddressesService } from './member-addresses.service';

describe('MemberAddressesController', () => {
  let controller: MemberAddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberAddressesController],
      providers: [MemberAddressesService],
    }).compile();

    controller = module.get<MemberAddressesController>(MemberAddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
