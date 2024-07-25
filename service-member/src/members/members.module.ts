import { forwardRef, Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Members } from './entities/member.entity';
import { OtpMailModule } from 'src/otp-mail/otp-mail.module';
import { MemberAddress } from 'src/member-addresses/entities/member-address.entity';
import { MemberAddressesModule } from 'src/member-addresses/member-addresses.module';
import { MinioModule } from 'src/minio/minio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Members]),
    forwardRef(() => OtpMailModule),
    forwardRef(() => MinioModule),
    MemberAddressesModule,
  ],
  controllers: [MembersController],
  providers: [MembersService],
  exports:[MembersService]
})
export class MembersModule {}
