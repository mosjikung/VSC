import { PartialType } from '@nestjs/swagger';
import { CreateOtpHistoryDto } from './create-otp-mail-history.dto';

export class UpdateOtpMailHistoryDto extends PartialType(CreateOtpHistoryDto) {}
