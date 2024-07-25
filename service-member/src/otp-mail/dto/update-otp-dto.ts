
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate,  IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOtp {
  
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  ref_code: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  otp:number;

  @IsDate()
  @IsNotEmpty()
  modified:Date;

  @IsNumber()
  @IsNotEmpty()
  modified_by:number;

  @IsString()
  expire_time:Date;
  

 
}