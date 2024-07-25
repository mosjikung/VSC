import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpHistoryService } from './otp-mail-history.service';
import { CreateOtpHistoryDto } from './dto/create-otp-mail-history.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Otp-Mail-History')
@Controller('otp-mail-history')
export class OtpHistoryController {
  constructor(private readonly otpHistoryService: OtpHistoryService) {}

  @Post()
  create(@Body() createOtpHistoryDto: CreateOtpHistoryDto) {
    const save =  this.otpHistoryService.create(createOtpHistoryDto);
  }

}
