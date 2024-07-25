import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  Query,
} from '@nestjs/common';
import { MoodLikeHistoriesService } from './mood_like_histories.service';
import { CreateMoodLikeHistoryDto } from './dto/create-mood_like_history.dto';
import { UpdateMoodLikeHistoryDto } from './dto/update-mood_like_history.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { decodeToken, getTime } from 'src/utility/utility';
import { JwtDecoderService } from 'src/utility/jwtdecode';
import { MembersService } from 'src/members/members.service';

@Controller('mood-like-histories')
export class MoodLikeHistoriesController {
  constructor(
    private readonly moodLikeHistoriesService: MoodLikeHistoriesService,
    private readonly memberService: MembersService,
  ) {}
  @ApiBearerAuth()
  @Post('insert-mood-like')
  async create(
    @Req() request: Request,
    @Body(new ValidationPipe())
    createMoodLikeHistoryDto: CreateMoodLikeHistoryDto,
  ) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const createMood = new CreateMoodLikeHistoryDto();
    const dateTime = getTime();
    createMood.created_by = user_id;
    createMood.modified_by = user_id;
    createMood.created = dateTime;
    createMood.modified = dateTime;
    createMood.mood_member_daily_id =
      createMoodLikeHistoryDto.mood_member_daily_id;
    createMood.value = createMoodLikeHistoryDto.value;
    const resultsCreated =
      await this.moodLikeHistoriesService.createMoodLike(createMood);
    if (resultsCreated) {
      return {
        code: '003',
        message_code: 'success_insert',
        message: 'เพิ่มข้อมูลสำเร็จ',
        status: 'success',
      };
    } else {
      return {
        code: '004',
        message_code: 'un_success_insert',
        message: 'เพิ่มข้อมูลไม่สำเร็จ',
        status: 'success',
      };
    }
  }

  @ApiBearerAuth()
  @Post('update-mood-like')
  async update(
    @Req() request: Request,
    @Query('mood_member_daily_id') moodMemberDailyId: number,
    @Body(new ValidationPipe())
    updateMoodLikeHistoryDto: UpdateMoodLikeHistoryDto,
  ): Promise<any> {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const updateMood = new UpdateMoodLikeHistoryDto();
    const dateTime = getTime();
    updateMood.is_deleted = true;
    updateMood.modified = dateTime;
    updateMood.modified_by = user_id;

    const getDataMoodDaily = await this.moodLikeHistoriesService.findOne({
      where: {
        is_deleted: false,
        mood_member_daily_id: moodMemberDailyId,
      },
    });
    if (getDataMoodDaily) {
      const updateResult = await this.moodLikeHistoriesService.update(
        getDataMoodDaily.id,
        updateMood,
      );

      if (updateResult) {
        return {
          code: '005',
          message_code: 'success_update',
          message: 'ปรับปรุงข้อมูลสำเร็จ',
          status: 'success',
        };
      } else {
        return {
          code: '006',
          message_code: 'un_success_update',
          message: 'ปรับปรุงข้อมูลไม่สำเร็จ',
          status: 'success',
        };
      }
    } else {
      return {
        code: '002',
        message_code: 'un_success_get',
        message: 'ไม่พบข้อมูล',
        status: 'success',
      };
    }
  }
}
