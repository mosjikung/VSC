
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangePasswordForgotDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newpassword: string;
 
}