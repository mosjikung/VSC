import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { publicDecrypt } from 'crypto';
import { Public } from 'src/decorators/public.decorator';
import { Languages } from './entities/language.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { responseLanguageDto } from './dto/response-language.dto';

@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiTags('Languages')
  @Public()
  @Get('/get-all-list-language')
  async findAll() {
    try{
      const allDataLang =  await this.languagesService.findAll();
      return {
        code:'001',
        message_code:'success_get_data',
        status:'success',
        message:'พบข้อมูล',
        data:allDataLang,
      }
      } catch (error){
        throw new HttpException(
          {
            code: '022',
            message_code: 'internal_server_error',
            message: 'internal_server_error',
            status:'error'
            
          },
          500,
        );
    }
    
  }

}
