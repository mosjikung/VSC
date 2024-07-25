import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMoodMemberDailyDto {
  @ApiProperty()
  @IsOptional()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsOptional()
  created: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  created_by: number;

  @ApiProperty()
  @IsOptional()
  modified: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  modified_by: number;

  @ApiProperty()
  @IsOptional()
  deleted: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  deleted_by: number;

  @ApiProperty()
  @IsBoolean()
  is_deleted: boolean;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  member_id: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(100)
  title: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  feeling_level_id: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(100)
  feeling_value: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  count_like: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  count_share: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  count_comment: number;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  location_activity_id: number;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  location_latitude: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(20)
  location_longitude: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(100)
  location_value: string;
}
