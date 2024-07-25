import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodFeelingLevelDto } from './create-mood_feeling_level.dto';

export class UpdateMoodFeelingLevelDto extends PartialType(CreateMoodFeelingLevelDto) {}
