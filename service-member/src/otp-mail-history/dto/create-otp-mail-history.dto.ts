import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpHistoryDto {
  
  @IsBoolean()
  @ApiProperty()
  is_deleted:boolean

  @IsString()
  @ApiProperty()
  created:Date;
  
  @IsNumber()
  @ApiProperty()
  created_by:number;

  @IsString()
  @ApiProperty()
  modified:Date;

  @IsNumber()
  @ApiProperty()
  modified_by:number;

  @IsString()
  @ApiProperty()
  deleted:Date;
  
  @IsNumber()
  @ApiProperty()
  deleted_by:number;

  @IsString()
  @ApiProperty()
  ref_code:string;

  @IsNumber()
  @ApiProperty()
  otp:number;

  
  @IsString()
  @ApiProperty()
  email:string;

  
}