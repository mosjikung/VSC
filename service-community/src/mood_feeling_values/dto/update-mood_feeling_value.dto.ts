import { PartialType } from '@nestjs/swagger';
import { CreateMoodFeelingValueDto } from './create-mood_feeling_value.dto';

export class UpdateMoodFeelingValueDto extends PartialType(CreateMoodFeelingValueDto) {}
