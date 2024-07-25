import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberAddressesService } from './member-addresses.service';
import { CreateMemberAddressDto } from './dto/create-member-address.dto';
import { UpdateMemberAddressDto } from './dto/update-member-address.dto';

@Controller('member-addresses')
export class MemberAddressesController {
  constructor(private readonly memberAddressesService: MemberAddressesService) {}

  


  

}
