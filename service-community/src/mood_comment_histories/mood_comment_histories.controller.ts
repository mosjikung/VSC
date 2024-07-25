import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { MoodCommentHistoriesService } from './mood_comment_histories.service';
import { CreateMoodCommentHistoryDto } from './dto/create-mood_comment_history.dto';
import { UpdateMoodCommentHistoryDto } from './dto/update-mood_comment_history.dto';
import { responseWithOutData } from 'src/utility/response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MoodMemberDailiesService } from 'src/mood_member_dailies/mood_member_dailies.service';
import { Request } from 'express';
import { MembersService } from 'src/members/members.service';

@ApiTags('MoodCommentHistories')
@Controller('mood-comment-histories')
export class MoodCommentHistoriesController {
  constructor(
    private readonly moodCommentHistoriesService: MoodCommentHistoriesService,
    private readonly moodMemberDailiesService: MoodMemberDailiesService,
    private readonly membersService: MembersService,
  ) {}

  @ApiBearerAuth()
  @Post('insert-mood-comment')
  async create(
    @Body()
    createMoodCommentHistoryDto: CreateMoodCommentHistoryDto,
  ): Promise<responseWithOutData> {
    try {
      let mood_comment_histories =
        await this.moodCommentHistoriesService.create(
          createMoodCommentHistoryDto,
        );
      let id = mood_comment_histories['mood_member_daily_id'];
      let count = await this.moodCommentHistoriesService.countComment(id);
      await this.moodMemberDailiesService.updateCommentCountById(id, +count);

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
  @Patch('update-mood-comment/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMoodCommentHistoryDto: UpdateMoodCommentHistoryDto,
  ): Promise<responseWithOutData> {
    try {
      await this.moodCommentHistoriesService.update(
        +id,
        updateMoodCommentHistoryDto.mood_member_daily_id,
        updateMoodCommentHistoryDto.description,
      );

      return {
        code: '005',
        message_code: 'success_update',
        message: 'ปรับปรุงข้อมูลสำเร็จ',
        status: 'success',
      };
    } catch (error) {
      throw new HttpException(
        {
          code: '006',
          message_code: 'un_success_update',
          message: 'ปรับปรุงข้อมูลไม่สำเร็จ',
          status: 'success',
        },
        404,
      );
    }
  }

  @ApiBearerAuth()
  @Patch('delete-mood-comment/:id')
  async deleteMoodComment(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<responseWithOutData> {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.membersService.decodeToken(token);
    const member_id = decodedToken['sub'];

    try {
      await this.moodCommentHistoriesService.delete(+id, +member_id);

      return {
        code: '005',
        message_code: 'success_update',
        message: 'ปรับปรุงข้อมูลสำเร็จ',
        status: 'success',
      };
    } catch (error) {
      throw new HttpException(
        {
          code: '006',
          message_code: 'un_success_update',
          message: 'ปรับปรุงข้อมูลไม่สำเร็จ',
          status: 'success',
        },
        404,
      );
    }
  }
}
