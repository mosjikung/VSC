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

export class RomoveCommunityCommentHistoryDto {
  @ApiProperty()
  @IsInt()
  id: number = 0;

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
}
