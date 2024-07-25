import { PartialType } from '@nestjs/mapped-types';
import { CreateMoodCommentHistoryDto } from './create-mood_comment_history.dto';

export class UpdateMoodCommentHistoryDto extends PartialType(CreateMoodCommentHistoryDto) {}
