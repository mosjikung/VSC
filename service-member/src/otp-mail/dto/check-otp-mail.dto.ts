import { isBoolean, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, isString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckOtpMailDto {

  @IsString()
  @ApiProperty()
  ref_code:string;
  
  @IsNumber()
  @ApiProperty()
  otp:number;

 

}
