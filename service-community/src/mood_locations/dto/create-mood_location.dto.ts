import { IsInt, IsBoolean, IsString, IsOptional, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateMoodLocationDto {
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

    @IsBoolean()
    is_deleted: boolean;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumberString()
    location_latitude: string;

    @IsNotEmpty()
    @IsNumberString()
    location_longitude: string;
}
