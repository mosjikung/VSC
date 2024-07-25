import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { OtpMailHistory } from './entities/otp-mail-history.entity';
import { CreateOtpHistoryDto } from './dto/create-otp-mail-history.dto';
import { UpdateOtpMailHistoryDto } from './dto/update-otp-mail-history.dto';


@Injectable()
export class OtpHistoryService{
  constructor(
    @InjectRepository(OtpMailHistory)
    private readonly otpHistoryRepository : Repository<OtpMailHistory>
  ){}
  async create(createOtpHistoryDto: CreateOtpHistoryDto):Promise<OtpMailHistory> {
    const data =  this.otpHistoryRepository.create(createOtpHistoryDto)
    return await this.otpHistoryRepository.save(data)
  }

}
