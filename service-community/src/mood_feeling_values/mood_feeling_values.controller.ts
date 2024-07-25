import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
} from '@nestjs/common';
import { MoodFeelingValuesService } from './mood_feeling_values.service';
import { CreateMoodFeelingValueDto } from './dto/create-mood_feeling_value.dto';
import { UpdateMoodFeelingValueDto } from './dto/update-mood_feeling_value.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('MoodFeelingValues')
@Controller('mood-feeling-values')
export class MoodFeelingValuesController {
  constructor(
    private readonly moodFeelingValuesService: MoodFeelingValuesService,
  ) {}

  @ApiBearerAuth()
  @Get('get-all-feeling-list')
  async getAllFeelingList(@Req() request: Request) {
    try {
      const data = await this.moodFeelingValuesService.getAllFeelingList();

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูลข้อมูล',
        status: 'success',
        data: data,
      };
    } catch (error) {
      throw new HttpException(
        {
          code: '002',
          message_code: 'un_success_get',
          message: 'ไม่พบข้อมูล',
          status: 'success',
        },
        404,
      );
    }
  }

  // @Post()
  // create(@Body() createMoodFeelingValueDto: CreateMoodFeelingValueDto) {
  //   return this.moodFeelingValuesService.create(createMoodFeelingValueDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.moodFeelingValuesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMoodFeelingValueDto: UpdateMoodFeelingValueDto) {
  //   return this.moodFeelingValuesService.update(+id, updateMoodFeelingValueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.moodFeelingValuesService.remove(+id);
  // }
}
