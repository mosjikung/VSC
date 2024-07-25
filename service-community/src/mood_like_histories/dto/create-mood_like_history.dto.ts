import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsPositive, IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMoodLikeHistoryDto {
    
    @ApiProperty({ default: false })
    @IsBoolean()
    @IsNotEmpty()
    is_deleted:boolean;
    
    @ApiProperty({ type: String, format: 'date-time', example: '2023-05-20T10:00:00Z' })
    @IsDate()
    @Type(() => Date)
    created: Date;

    @ApiProperty({ type: String, format: 'date-time', example: '2023-05-20T10:00:00Z' })
    @IsDate()
    @Type(() => Date)
    modified: Date;

    @IsNumber()
    created_by:number = 0;

    @IsNumber()
    modified_by:number = 0;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    mood_member_daily_id: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    value:number;

}