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

export class CreateCommunityPhotoDto {
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
}
