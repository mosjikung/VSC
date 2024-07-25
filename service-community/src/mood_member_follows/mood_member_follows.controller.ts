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
import { MoodMemberFollowsService } from './mood_member_follows.service';
import { CreateMoodMemberFollowDto } from './dto/create-mood_member_follow.dto';
import { UpdateMoodMemberFollowDto } from './dto/update-mood_member_follow.dto';
import { InsertMoodMemberFollowDto } from './dto/insert-mood_member_follow.dto';

@ApiTags('MoodMemberFollows')
@Controller('mood-member-follows')
export class MoodMemberFollowsController {
  constructor(
    private readonly moodMemberFollowsService: MoodMemberFollowsService,
    private readonly memberService: MembersService,
  ) {}

  @ApiBearerAuth()
  @Get('get-follow-count-by-id/:user_id')
  async getFollowCountById(
    @Req() request: Request,
    @Param('follow_user_id') follow_user_id: number,
  ) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token);
    const user_id = decodedToken['sub'];
    try {
      const follower = await this.moodMemberFollowsService.follower(+user_id);
      const following = await this.moodMemberFollowsService.following(+user_id);
      const follow = await this.moodMemberFollowsService.follow(
        +user_id,
        +follow_user_id,
      );
      const member = await this.memberService.getMember(
        +user_id,
      );
      console.log('member');
      console.log(member);

      return {
        code: '001',
        message_code: 'success_get',
        message: 'พบข้อมูลข้อมูล',
        status: 'success',
        data: {
          follower: follower,
          following: following,
          follow: follow,
          member: member,
        },
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
  @Post('insert-follow')
  async create(
    @Req() request: Request,
    @Body(new ValidationPipe())
    createMoodMemberFollowDto: InsertMoodMemberFollowDto,
  ) {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const createMood = new CreateMoodMemberFollowDto();
    const dateTime = getTime();
    createMood.created_by = user_id;
    createMood.modified_by = user_id;
    createMood.created = dateTime;
    createMood.modified = dateTime;
    createMood.member_id = createMoodMemberFollowDto.member_id;

    const getDataMemberFollow = await this.moodMemberFollowsService.findOne({
      where: {
        is_deleted: false,
        created_by: user_id,
        member_id: createMoodMemberFollowDto.member_id,
      },
    });

    if (!getDataMemberFollow) {
      const resultsCreated =
        await this.moodMemberFollowsService.createMoodMemberFollow(createMood);
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
    } else {
      return {
        code: 'E001',
        message_code: 'duplicate_data',
        message: 'ข้อมูลซ้ำ',
        status: 'error',
      };
    }
  }

  @ApiBearerAuth()
  @Post('update-follow')
  async update(
    @Req() request: Request,
    @Body(new ValidationPipe())
    updateMoodMemberFollowDto: InsertMoodMemberFollowDto,
  ): Promise<any> {
    const token = request.headers['authorization'].split(' ')[1];
    const decodedToken = this.memberService.decodeToken(token); // เรียกใช้ decodeToken และเก็บผลลัพธ์ใน decodedToken
    const user_id = decodedToken['sub'];
    const updateMood = new UpdateMoodMemberFollowDto();
    const dateTime = getTime();
    updateMood.is_deleted = true;
    updateMood.modified = dateTime;
    updateMood.modified_by = user_id;

    const getDataMemberFollow = await this.moodMemberFollowsService.findOne({
      where: {
        is_deleted: false,
        created_by: user_id,
        member_id: updateMoodMemberFollowDto.member_id,
      },
    });
    if (getDataMemberFollow) {
      const updateResult = await this.moodMemberFollowsService.update(
        getDataMemberFollow.id,
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
