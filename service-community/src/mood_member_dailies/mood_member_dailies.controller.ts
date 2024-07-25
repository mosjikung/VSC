import { MoodFeelingLevelsService } from 'src/mood_feeling_levels/mood_feeling_levels.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
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
  ValidationPipe,
} from '@nestjs/common';
import { MoodMemberDailiesService } from './mood_member_dailies.service';
import { CreateMoodMemberDailyDto } from './dto/create-mood_member_daily.dto';
import { UpdateMoodMemberDailyDto } from './dto/update-mood_member_daily.dto';
import { Request } from 'express';
import { IsEmpty } from 'class-validator';
import { responseWithOutData } from 'src/utility/response.dto';
import { MembersService } from 'src/members/members.service';
import { getTime } from 'src/utility/utility';

@ApiTags('MoodMemberDailies')
@Controller('mood-member-dailies')
export class MoodMemberDailiesController {
  constructor(
    private readonly moodMemberDailiesService: MoodMemberDailiesService,
    private readonly moodFeelingLevelsService: MoodFeelingLevelsService,
    private readonly memberService: MembersService,
  ) {}

  @ApiBearerAuth()
  @Post('insert-moods-daily')
  async create(
    @Req() request: Request,
    @Body(new ValidationPipe())
    createMoodMemberDailyDto: CreateMoodMemberDailyDto,
  ): Promise<responseWithOutData> {
    try {
      const token = request.headers['authorization'].split(' ')[1];
      const decodedToken = this.memberService.decodeToken(token);
      const user_id = decodedToken['sub'];
      await this.moodMemberDailiesService.create(
        user_id,
        createMoodMemberDailyDto,
      );

      return {
        code: '003',
        message_code: 'success_create',
        message: 'บันทึกข้อมูลสำเร็จ',
        status: 'success',
      };
    } catch (error) {
      throw new HttpException(
        {
          code: '004',
          message_code: 'un_success_create',
          message: 'บันทึกข้อมูลไม่สำเร็จ',
          status: 'success',
        },
        404,
      );
    }
  }

  @ApiBearerAuth()
  @Get('get-all-feed-history-list/:user_id')
  async getAllFeedHistoryList(
    @Param('user_id') user_id: number,
    @Req() request: Request,
  ) {
    const query = request.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    try {
      const data = await this.moodMemberDailiesService.findAll(
        +page,
        +limit,
        0,
      );
      const count = await this.moodMemberDailiesService.activeMoodCountToDay();
      const post_today =
        await this.moodMemberDailiesService.checkMyPostToDay(+user_id);
      const mood_level = await this.moodFeelingLevelsService.getMoodLevel();
      const count_data = await this.moodMemberDailiesService.getCountData();

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        count: count,
        count_data: count_data,
        post_today: post_today,
        mood_level: mood_level,
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

  @ApiBearerAuth()
  @Get('get-mood-by-week')
  async getMoodByWeek(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token);
    const user_id = decodedToken['sub'];

    try {
      const currentDate = new Date();
      const currentWeekStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() -
          (currentDate.getDay() === 0 ? 6 : currentDate.getDay() - 1),
      );
      const currentWeekEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() +
          (currentDate.getDay() === 0 ? 0 : 7 - currentDate.getDay()),
      );

      const getMoodImageByWeek =
        await this.moodMemberDailiesService.getMoodLevelByWeek(
          currentWeekStart,
          currentWeekEnd,
          +user_id,
        );

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        data: getMoodImageByWeek,
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

  @ApiBearerAuth()
  @Get('get-mood-by-month')
  async getMoodByMonth(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token);
    const user_id = decodedToken['sub'];
    try {
      const currentDate = new Date();
      const currentMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const currentMonthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      );

      const getMoodImageByWeek =
        await this.moodMemberDailiesService.getMoodLevelByMonth(
          currentMonthStart,
          currentMonthEnd,
          +user_id,
        );

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        data: getMoodImageByWeek,
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

  @ApiBearerAuth()
  @Get('get-feeling-by-month')
  async getFeelingByMonth(@Req() request: Request) {
    try {
      const token = request.headers['authorization'].split(' ')[1];
      const decodedToken = this.memberService.decodeToken(token);
      const member_id = decodedToken['sub'];

      const currentDate = new Date();
      const currentMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const currentMonthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      );

      const data = await this.moodMemberDailiesService.getFeelingByMonth(
        currentMonthStart,
        currentMonthEnd,
        member_id,
        0,
      );

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
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

  @ApiBearerAuth()
  @Get('get-feeling-month-by-id/:mood_member_daily_id')
  async getFeelingMonthById(
    @Req() request: Request,
    @Param('mood_member_daily_id') mood_member_daily_id: number,
  ) {
    try {
      const token = request.headers['authorization'].split(' ')[1];
      const decodedToken = this.memberService.decodeToken(token);
      const member_id = decodedToken['sub'];

      const currentDate = new Date();
      const currentMonthStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1,
      );
      const currentMonthEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      );

      const data = await this.moodMemberDailiesService.getFeelingByMonth(
        currentMonthStart,
        currentMonthEnd,
        member_id,
        mood_member_daily_id,
      );

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
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

  @ApiBearerAuth()
  @Get('get-all-my-history-list')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
        },
      },
    },
  })
  async getAllMyHistoryList(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token);
    const user_id = decodedToken['sub'];
    try {
      const currentDate = new Date();
      const currentWeekStart = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - currentDate.getDay(),
      );
      const currentWeekEnd = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + (6 - currentDate.getDay()),
      );

      const search = request.query.search?.toString(); // Convert search parameter to string

      const getMoodByWeek = await this.moodMemberDailiesService.getMoodByWeek(
        currentWeekStart,
        currentWeekEnd,
        +user_id,
        search,
      );

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        data: getMoodByWeek,
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

  @ApiBearerAuth()
  @Get('get-mood-by-id/:mood_member_daily_id')
  async getMoodById(
    @Param('mood_member_daily_id') mood_member_daily_id: number,
    @Req() request: Request,
  ) {
    try {
      const getMoodByWeek =
        await this.moodMemberDailiesService.getMoodById(+mood_member_daily_id);

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        data: getMoodByWeek,
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

  @ApiBearerAuth()
  @Get('get-all-my-list')
  async getAllMyList(@Req() request: Request) {
    const query = request.query;
    const page = query.page || 1;
    const limit = query.limit || 10;

    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token);
    const user_id = decodedToken['sub'];
    console.log(user_id);
    try {
      const data = await this.moodMemberDailiesService.findAll(
        +page,
        +limit,
        +user_id,
      );
      const count_data =
        await this.moodMemberDailiesService.getCountDataByMemberId(user_id);

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        count_data: count_data,
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

  @ApiBearerAuth()
  @Get('get-all-user-list/:user_id')
  async getAllUserList(
    @Param('user_id') user_id: number,
    @Req() request: Request,
  ) {
    const query = request.query;
    const page = query.page || 1;
    const limit = query.limit || 10;
    try {
      const data = await this.moodMemberDailiesService.getAllUserList(
        +page,
        +limit,
        +user_id,
      );
      const count_data =
        await this.moodMemberDailiesService.getCountDataByMemberId(user_id);

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูล',
        status: 'success',
        count_data: count_data,
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
}
