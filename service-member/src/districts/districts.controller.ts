import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { Districts } from './entities/district.entity';
import { responseWithData } from 'src/utility/response.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Districts')
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}
  @Public()
  @Get('get-district-by-id')
  async create(@Query('provinceId')provinceId:number):Promise<any>{
    const districtData = await this.districtsService.findAll({
      select: {
        id: true,
        name:true,
        description:true,
        is_active:true,
        code:true,

      },
      where: { province_id: provinceId },
    });

    if (districtData){
      return {
        status:'success',
        message_code:'success_get_data',      
        code:'001',
        message:'พบข้อมูล',
        data:districtData
      }
    }else{
      return {
        status:'success',
        message_code:'un_success_get',      
        code:'002',
        message:'ไม่พบข้อมูล'
      }
    }
  }

}
