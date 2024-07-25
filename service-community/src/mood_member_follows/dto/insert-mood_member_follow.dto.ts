import { IsBoolean, IsInt, IsOptional, IsPositive, IsDate, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class InsertMoodMemberFollowDto {
    
    @ApiProperty()
    @IsInt()
    member_id: number;
}
