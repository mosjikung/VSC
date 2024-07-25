
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMemberDto {
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  modified: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  modified_by: number;


 
}