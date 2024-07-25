import {
  IsInt,
  IsDate,
  IsNumber,
  IsString,
  IsBoolean,
  IsPositive,
  IsOptional,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommunityLikeHistoryDto } from './create-community_like_history.dto';

export class UpdateCommunityLikeHistoryDto {
  @IsOptional()
  @IsDate()
  id: number;

  @IsOptional()
  @IsDate()
  modified: Date;

  @IsOptional()
  @IsInt()
  modified_by: number = 0;

  @IsOptional()
  @IsDate()
  deleted: Date;

  @IsOptional()
  @IsInt()
  deleted_by: number = 0;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  is_deleted: boolean;

  @ApiProperty()
  @IsInt()
  community_feed_id: number;
}
