import { IsBoolean, IsInt, IsOptional, IsPositive, IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMoodMemberFollowDto {
    
    @ApiProperty({ type: String, format: 'date-time', example: '2023-05-20T10:00:00Z' })
    @IsDate()
    @Type(() => Date)
    created: Date;

    @IsInt()
    created_by: number = 0;

    @ApiProperty({ type: String, format: 'date-time', example: '2023-05-20T10:00:00Z' })
    @IsDate()
    @Type(() => Date)
    modified: Date;

    @IsInt()
    modified_by: number = 0;

    @ApiProperty({ type: String, format: 'date-time', example: '2023-05-20T10:00:00Z' })
    @IsDate()
    @Type(() => Date)
    deleted: Date;

    @IsInt()
    deleted_by: number = 0;

    @ApiProperty({ default: false })
    @IsBoolean()
    @IsNotEmpty()
    is_deleted: boolean;

    @ApiProperty()
    @IsInt()
    member_id: number;
}
