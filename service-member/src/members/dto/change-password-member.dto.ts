
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangePasswordDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldpassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newpassword: string;

 
}