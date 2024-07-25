import { IsInt, IsDate, IsBoolean, IsString } from 'class-validator';

export class CreateMoodMemberPhotoDto {
    @IsInt()
    id: number;

    @IsDate()
    created: Date;

    @IsInt()
    created_by: number;

    @IsDate()
    modified: Date;

    @IsInt()
    modified_by: number;

    @IsDate()
    deleted: Date;

    @IsInt()
    deleted_by: number;

    @IsBoolean()
    is_deleted: boolean;

    @IsInt()
    community_feed_id: number;

    @IsString()
    file_name: string;

    @IsString()
    file_path: string;

    @IsString()
    file_type: string;

    @IsString()
    file_size: string;

    @IsString()
    object_key: string;
}
