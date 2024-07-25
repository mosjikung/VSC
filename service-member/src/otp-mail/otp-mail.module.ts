import { forwardRef, Module } from '@nestjs/common';
import { OtpMailService } from './otp-mail.service';
import { OtpMailController } from './otp-mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpMail } from './entities/otp-mail.entity';
import { MembersModule } from 'src/members/members.module';
import { OtpMailHistoryModule } from 'src/otp-mail-history/otp-mail-history.module';
import { AuthService } from 'src/auth/auth.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([OtpMail]),
    OtpMailHistoryModule,
    forwardRef(() => MembersModule)
  ],
  controllers: [OtpMailController],
  providers: [OtpMailService],
  exports:[OtpMailService]
})
export class OtpMailModule {}
