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

export class UpdateCommunityCommentHistoryDto {
  @ApiProperty()
  @IsInt()
  id: number = 0;

  @IsOptional()
  @IsDate()
  modified: Date;

  @IsOptional()
  @IsInt()
  modified_by: number = 0;

  @ApiProperty()
  @IsString()
  description: string;
}
