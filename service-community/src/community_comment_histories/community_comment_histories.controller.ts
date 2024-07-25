import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  HttpException,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { decodeToken, getTime } from 'src/utility/utility';
import { JwtDecoderService } from 'src/utility/jwtdecode';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MembersService } from 'src/members/members.service';
import { CommunityCommentHistoriesService } from './community_comment_histories.service';
import { CreateCommunityCommentHistoryDto } from './dto/create-community_comment_history.dto';
import { UpdateCommunityCommentHistoryDto } from './dto/update-community_comment_history.dto';
import { RomoveCommunityCommentHistoryDto } from './dto/remove-community_comment_history.dto';
import { responseWithOutData } from 'src/utility/response.dto';

@ApiTags('Community')
@Controller('community-comment-histories')
export class CommunityCommentHistoriesController {
  constructor(
    private readonly communityCommentHistoriesService: CommunityCommentHistoriesService,
    private readonly memberService: MembersService,
  ) {}

  @ApiBearerAuth()
  @Post('insert-news-comment')
  async create(
    @Req() request: Request,
    @Body() createCommunityCommentHistoryDto: CreateCommunityCommentHistoryDto,
  ): Promise<responseWithOutData> {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const dateTime = getTime();

    createCommunityCommentHistoryDto.created = dateTime;
    createCommunityCommentHistoryDto.created_by = user_id;
    createCommunityCommentHistoryDto.modified = dateTime;
    createCommunityCommentHistoryDto.modified_by = user_id;

    try {
      await this.communityCommentHistoriesService.create(
        createCommunityCommentHistoryDto,
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
  @Post('update-news-comment')
  async update(
    @Req() request: Request,
    @Body() updateCommunityCommentHistoryDto: UpdateCommunityCommentHistoryDto,
  ): Promise<responseWithOutData> {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const dateTime = getTime();

    const checkData = await this.communityCommentHistoriesService.checkData(
      updateCommunityCommentHistoryDto.id,
    );

    if (checkData > 0) {
      updateCommunityCommentHistoryDto.modified = dateTime;
      updateCommunityCommentHistoryDto.modified_by = user_id;

      try {
        await this.communityCommentHistoriesService.update(
          updateCommunityCommentHistoryDto,
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
    } else {
      return {
        code: '002',
        message_code: 'un_success_get',
        message: 'ไม่พบข้อมูล',
        status: 'success',
      };
    }
  }

  @ApiBearerAuth()
  @Post('remove-news-comment')
  async remove(
    @Req() request: Request,
    @Body() romoveCommunityCommentHistoryDto: RomoveCommunityCommentHistoryDto,
  ): Promise<responseWithOutData> {
    const checkData = await this.communityCommentHistoriesService.checkData(
      romoveCommunityCommentHistoryDto.id,
    );

    if (checkData > 0) {
      const token = request.headers['authorization'].split(' ')[1];
      const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
      const user_id = decodedToken['sub'];
      const dateTime = getTime();

      romoveCommunityCommentHistoryDto.deleted = dateTime;
      romoveCommunityCommentHistoryDto.deleted_by = user_id;
      romoveCommunityCommentHistoryDto.is_deleted = true;

      try {
        await this.communityCommentHistoriesService.remove(
          romoveCommunityCommentHistoryDto,
        );

        return {
          code: '007',
          message_code: 'success_deleted',
          message: 'ลบข้อมูลสำเร็จ',
          status: 'success',
        };
      } catch (error) {
        throw new HttpException(
          {
            code: '008',
            message_code: 'un_success_deleted',
            message: 'ลบข้อมูลไม่สำเร็จ',
            status: 'success',
          },
          404,
        );
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
