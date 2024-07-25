import { Injectable } from '@nestjs/common';
import { CreateMemberAddressDto } from './dto/create-member-address.dto';
import { UpdateMemberAddressDto } from './dto/update-member-address.dto';
import { CrudService } from 'src/libs/common/src';
import { MemberAddress } from './entities/member-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MemberAddressesService extends CrudService<MemberAddress> {
  constructor(
    @InjectRepository(MemberAddress)
    private readonly memberAddressRepository: Repository<MemberAddress>,
  ) {
    super(memberAddressRepository);
  }

  async createMemberAddress(createMemberAddressDto) {
    try {
      if (createMemberAddressDto) {
        const newMemberDataAddress = this.memberAddressRepository.create(
          createMemberAddressDto,
        );

        return await this.memberAddressRepository.save(newMemberDataAddress);
      }
    } catch (e) {
      return console.log(e);
    }
  }
}
