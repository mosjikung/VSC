import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodMemberPhotoDto } from './create-mood_member_photo.dto';

export class UpdateMoodMemberPhotoDto extends PartialType(CreateMoodMemberPhotoDto) {}
