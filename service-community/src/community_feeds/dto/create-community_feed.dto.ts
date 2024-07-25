import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsDate,
  IsNumber,
  IsNotEmpty,
  MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommunityFeedDto {
  @IsOptional()
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-05-20T10:00:00Z',
  })
  @IsDate()
  created: Date;

  @IsOptional()
  @IsInt()
  created_by: number = 0;

  @IsOptional()
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-05-20T10:00:00Z',
  })
  @IsDate()
  modified: Date;

  @IsOptional()
  @IsInt()
  modified_by: number = 0;

  @IsOptional()
  @ApiProperty({
    type: String,
    format: 'date-time',
    example: '2023-05-20T10:00:00Z',
  })
  @IsDate()
  deleted: Date;

  @IsOptional()
  @IsInt()
  deleted_by: number = 0;

  @IsOptional()
  @ApiProperty({ default: false })
  @IsBoolean()
  @IsNotEmpty()
  is_deleted: boolean;

  @IsOptional()
  @IsInt()
  community_type_id: number;

  @IsOptional()
  @MaxLength(100)
  topic: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsBoolean()
  is_share: boolean;

  @ApiProperty()
  @IsBoolean()
  is_comment: boolean;

  @ApiProperty()
  @IsBoolean()
  is_like: boolean;
}
