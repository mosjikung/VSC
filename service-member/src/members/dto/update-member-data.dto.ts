
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { getTime } from 'src/utility/utility';
import * as dayjs from 'dayjs';


const exampleDate = dayjs().add(7, 'hour').toISOString();


export class UpdateMemberDataDto {

  
  @IsDate()
  created:Date;
  
 
  @IsNumber()
  created_by:number;

  
  @IsDate()
  modified:Date;
  
  
  @IsNumber()
  modified_by:number;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;


  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  birthday:Date;

  @ApiProperty()
  @IsNumber()
  member_objective_id : number;

  @ApiProperty()
  @IsNumber()
  gender:number;

  @ApiProperty()
  @IsNumber()
  province_id:number;

  @ApiProperty()
  @IsNumber()
  district_id:number;

  @ApiProperty()
  @IsNumber()
  subdistrict_id:number;

  @ApiProperty()
  @IsString()
  address:string;

  @ApiProperty()
  @IsNumber()
  zip_code:number;
  
}