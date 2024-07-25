import { Module } from '@nestjs/common';
import { MemberAddressesService } from './member-addresses.service';
import { MemberAddressesController } from './member-addresses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberAddress } from './entities/member-address.entity';

@Module({
  imports:[TypeOrmModule.forFeature([MemberAddress])],
  controllers: [MemberAddressesController],
  providers: [MemberAddressesService],
  exports:[MemberAddressesService]
})
export class MemberAddressesModule {}
