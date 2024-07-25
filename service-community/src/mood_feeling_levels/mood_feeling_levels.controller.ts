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
import { MoodFeelingLevelsService } from './mood_feeling_levels.service';
import { CreateMoodFeelingLevelDto } from './dto/create-mood_feeling_level.dto';
import { UpdateMoodFeelingLevelDto } from './dto/update-mood_feeling_level.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MembersService } from 'src/members/members.service';

@ApiTags('MoodFeelingLevels')
@Controller('mood-feeling-levels')
export class MoodFeelingLevelsController {
  constructor(
    private readonly moodFeelingLevelsService: MoodFeelingLevelsService,
    private readonly memberService: MembersService,
  ) {}

  @ApiBearerAuth()
  @Get('get-mood-level')
  async getMoodLevel(@Req() request: Request) {
    try {
      const mood_level = await this.moodFeelingLevelsService.getMoodLevel();

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        data: mood_level,
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
}
