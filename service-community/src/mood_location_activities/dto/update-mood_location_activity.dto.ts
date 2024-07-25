import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodLocationActivityDto } from './create-mood_location_activity.dto';

export class UpdateMoodLocationActivityDto extends PartialType(CreateMoodLocationActivityDto) {}
