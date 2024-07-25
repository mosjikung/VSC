import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubdistrictsService } from './subdistricts.service';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('SubDistricts')
@Controller('Subdistricts')
export class SubdistrictsController {
  constructor(private readonly subdistrictService: SubdistrictsService) {}
  @Public()
  @Get('get-district-by-id')
  async create(@Query('districtId')districtId:number):Promise<any>{
    const subDistrictData = await this.subdistrictService.findAll({
      select: {
        id: true,
        name:true,
        description:true,
        is_active:true,
        code:true,

      },
      where: { district_id: districtId },
    });

    if (subDistrictData){
      return {
        status:'success',
        message_code:'success_get_data',      
        code:'001',
        message:'พบข้อมูล',
        data:subDistrictData
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
