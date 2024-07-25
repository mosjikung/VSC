import { IsInt, IsDate, IsBoolean, IsString } from 'class-validator';

export class CreateMoodShareHistoryDto {
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
    mood_member_daily_id: number;

    @IsString()
    channel: string;
}