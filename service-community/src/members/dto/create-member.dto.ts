import { IsInt, IsString, IsBoolean, IsDate, IsEmail, Length, IsOptional } from 'class-validator';

export class CreateMemberDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  username: string;

  @IsString()
  @Length(1, 255)
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 520)
  avatar_name: string;

  @IsOptional()
  @IsString()
  avatar_img: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  avatar_path: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  code: string;

  @IsOptional()
  @IsInt()
  citizen_id: number;

  @IsOptional()
  @IsString()
  @Length(1, 520)
  first_name: string;

  @IsOptional()
  @IsString()
  @Length(1, 520)
  last_name: string;

  @IsOptional()
  @IsString()
  @Length(1, 15)
  phone_number: string;

  @IsEmail()
  @Length(1, 50)
  email: string;

  @IsOptional()
  @IsString()
  remark: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  email_verify: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  unique_link: string;

  @IsOptional()
  expire_time: Date;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  unique_link_activated: string;

  @IsOptional()
  expire_time_activated: Date;

  @IsOptional()
  @IsBoolean()
  is_activated: boolean;

  @IsOptional()
  lasted_login: Date;

  @IsOptional()
  @IsString()
  @Length(1, 6)
  otp_member: string;

  @IsOptional()
  otp_member_expire_time: Date;

  @IsOptional()
  @IsInt()
  role_id: number;

  @IsOptional()
  @IsInt()
  member_objective_id: number;

  @IsOptional()
  @IsString()
  @Length(1, 40)
  session_id: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

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

  @IsOptional()
  @IsBoolean()
  is_deleted: boolean;

  @IsOptional()
  birthday: Date;
}