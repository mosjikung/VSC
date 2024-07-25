import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodMemberDailyDto } from './create-mood_member_daily.dto';

export class UpdateMoodMemberDailyDto extends PartialType(CreateMoodMemberDailyDto) {}
