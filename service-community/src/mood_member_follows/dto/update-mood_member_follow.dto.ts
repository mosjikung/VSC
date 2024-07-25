import { PartialType } from '@nestjs/swagger';
import { CreateMoodMemberFollowDto } from './create-mood_member_follow.dto';

export class UpdateMoodMemberFollowDto extends PartialType(CreateMoodMemberFollowDto) {}
