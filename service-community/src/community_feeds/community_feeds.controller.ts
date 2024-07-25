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
import { CommunityFeedsService } from './community_feeds.service';
import { CreateCommunityFeedDto } from './dto/create-community_feed.dto';
import { UpdateCommunityFeedDto } from './dto/update-community_feed.dto';

@ApiTags('Community')
@Controller('community-feeds')
export class CommunityFeedsController {
  constructor(
    private readonly communityFeedsService: CommunityFeedsService,
    private readonly memberService: MembersService,
  ) {}

  @ApiBearerAuth()
  @Get('get-all-list-news')
  async getAllListNews(@Req() request: Request) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token);
    const my_id = decodedToken['sub'];

    const query = request.query;
    const page = query.page || 1;
    const limit = query.limit || 10;    
    const community_type_id = 1;

    const getDataCommunityFeed = await this.communityFeedsService.findAll(
      +page,
      +limit,
      +community_type_id
    );
    
    try {
      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูลข้อมูล',
        status: 'success',
        data: getDataCommunityFeed,
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
