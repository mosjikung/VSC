import { PartialType } from '@nestjs/swagger';
import { CreateOtpMailDto } from './create-otp-mail.dto';

export class UpdateOtpMailDto extends PartialType(CreateOtpMailDto) {}
