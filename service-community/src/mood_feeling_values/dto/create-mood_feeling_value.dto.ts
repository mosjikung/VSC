import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMoodFeelingValueDto {
    @IsOptional()
    @IsInt()
    id: number;

    @IsOptional()
    created: Date;

    @IsOptional()
    @IsInt()
    created_by: number;

    @IsOptional()
    modified: Date;

    @IsOptional()
    @IsInt()
    modified_by: number;

    @IsOptional()
    deleted: Date;

    @IsOptional()
    @IsInt()
    deleted_by: number;

    @IsNotEmpty()
    @IsBoolean()
    is_deleted: boolean;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    name: string;

    @IsOptional()
    @IsInt()
    value: number;
}
