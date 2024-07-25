import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsDate, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateMoodCommentHistoryDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsDate()
    created: Date;

    @ApiProperty()
    @IsInt()
    created_by: number;

    @ApiProperty()
    @IsDate()
    modified: Date;

    @ApiProperty()
    @IsInt()
    modified_by: number;

    @ApiProperty()
    @IsDate()
    deleted: Date;

    @ApiProperty()
    @IsInt()
    deleted_by: number;

    @ApiProperty()
    @IsBoolean()
    is_deleted: boolean;

    @ApiProperty()
    @IsInt()
    mood_member_daily_id: number;

    @ApiProperty()
    @IsString()
    description: string;
}