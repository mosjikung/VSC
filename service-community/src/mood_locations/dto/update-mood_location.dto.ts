import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodLocationDto } from './create-mood_location.dto';

export class UpdateMoodLocationDto extends PartialType(CreateMoodLocationDto) {}
