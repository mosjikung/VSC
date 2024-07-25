import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, isNumber, IsNumber, IsString } from 'class-validator';
import { create } from 'domain';
import { getTime } from 'src/utility/utility';


export class CreateMemberAddressDto {
  
  @IsDate()
  created:Date;
  
  
  @IsNumber()
  created_by:number;

 
  @IsDate()
  modified:Date;
  
  
  @IsNumber()
  modified_by:number;

  
  @IsNumber()
  province_id:number;

  
  @IsNumber()
  district_id:number;

  
  @IsNumber()
  subdistrict_id:number;

  
  @IsString()
  address:string;

  
  @IsNumber()
  zip_code:number;

  
  @IsNumber()
  member_id:number;

}

