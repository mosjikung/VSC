import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpMailHistory } from './entities/otp-mail-history.entity';
import { OtpHistoryController } from './otp-mail-history.controller';
import { OtpHistoryService } from './otp-mail-history.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([OtpMailHistory]),
  ],
  controllers: [OtpHistoryController],
  providers: [OtpHistoryService],
  exports:[OtpHistoryService]
})
export class OtpMailHistoryModule {}
