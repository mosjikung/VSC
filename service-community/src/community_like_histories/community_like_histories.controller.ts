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
import { CommunityLikeHistoriesService } from './community_like_histories.service';
import { CreateCommunityLikeHistoryDto } from './dto/create-community_like_history.dto';
import { UpdateCommunityLikeHistoryDto } from './dto/update-community_like_history.dto';
import { responseWithOutData } from 'src/utility/response.dto';

@ApiTags('Community')
@Controller('community-like-histories')
export class CommunityLikeHistoriesController {
  constructor(
    private readonly communityLikeHistoriesService: CommunityLikeHistoriesService,
    private readonly memberService: MembersService,
  ) {}

  @ApiBearerAuth()
  @Post('insert-news-like')
  async create(
    @Req() request: Request,
    @Body() createCommunityLikeHistoryDto: CreateCommunityLikeHistoryDto,
  ): Promise<responseWithOutData> {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const dateTime = getTime();

    createCommunityLikeHistoryDto.created = dateTime;
    createCommunityLikeHistoryDto.created_by = user_id;
    createCommunityLikeHistoryDto.modified = dateTime;
    createCommunityLikeHistoryDto.modified_by = user_id;

    try {
      await this.communityLikeHistoriesService.create(
        createCommunityLikeHistoryDto,
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
  @Post('insert-news-unlike')
  async update(
    @Req() request: Request,
    @Body(new ValidationPipe())
    updateCommunityLikeHistoryDto: UpdateCommunityLikeHistoryDto,
  ): Promise<responseWithOutData> {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const dateTime = getTime();

    const checkDataReference =
      await this.communityLikeHistoriesService.checkDataReference(
        updateCommunityLikeHistoryDto.community_feed_id,
        user_id,
      );

    if (checkDataReference.length > 0) {

      updateCommunityLikeHistoryDto.id = checkDataReference[0]['id'];
      updateCommunityLikeHistoryDto.modified = dateTime;
      updateCommunityLikeHistoryDto.modified_by = user_id;
      updateCommunityLikeHistoryDto.deleted = dateTime;
      updateCommunityLikeHistoryDto.deleted_by = user_id;
      updateCommunityLikeHistoryDto.is_deleted = true;

      try {
        await this.communityLikeHistoriesService.update(
          updateCommunityLikeHistoryDto,
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
}
