import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodShareHistoryDto } from './create-mood_share_history.dto';

export class UpdateMoodShareHistoryDto extends PartialType(CreateMoodShareHistoryDto) {}
