import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsPositive, IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class UpdateMoodLikeHistoryDto {
    
    @ApiProperty({default:true})
    @IsBoolean()
    @IsNotEmpty()
    is_deleted:boolean;
    

    @ApiProperty({ type: String, format: 'date-time', example: '2023-05-20T10:00:00Z' })
    @IsDate()
    @Type(() => Date)
    modified: Date;


    @IsNumber()
    modified_by:number = 0;

}