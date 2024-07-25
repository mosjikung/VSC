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
export class CreateCommunityLikeHistoryDto {
  @IsOptional()
  @IsDate()
  created: Date;

  @IsOptional()
  @IsInt()
  created_by: number = 0;

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

  @ApiProperty()
  @IsInt()
  value: number;
}
