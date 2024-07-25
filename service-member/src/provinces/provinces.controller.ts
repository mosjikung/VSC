import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Public } from 'src/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Province')
@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  // @Post()
  // create(@Body() createProvinceDto: CreateProvinceDto) {
  //   return this.provincesService.create(createProvinceDto);
  // }

  @Public()
  @Get('get-all-list-province')
  findAll() {
    return this.provincesService.findAll();
  }

  // @Public()
  // @Get('/get2Table')
  // find2Table(){
  //   return this.provincesService.findAllWithDistricts();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.provincesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProvinceDto: UpdateProvinceDto) {
  //   return this.provincesService.update(+id, updateProvinceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.provincesService.remove(+id);
  // }
}
