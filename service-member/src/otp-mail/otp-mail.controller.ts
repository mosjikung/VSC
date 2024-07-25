import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  Query,
} from '@nestjs/common';
import { OtpMailService } from './otp-mail.service';
import { CreateOtpMailDto } from './dto/create-otp-mail.dto';
import { UpdateOtpMailDto } from './dto/update-otp-mail.dto';
import { Public } from 'src/decorators/public.decorator';

import * as dayjs from 'dayjs';
import { ApiTags } from '@nestjs/swagger';
import { MembersService } from 'src/members/members.service';
import {
  getTime,
  generateMd5,
  getOtp,
  generateRefCode,
  getTime10,
} from 'src/utility/utility';
import { ChangePasswordDto } from 'src/members/dto/change-password-member.dto';
import { CheckOtpMailDto } from './dto/check-otp-mail.dto';
import { CreateOtpHistoryDto } from 'src/otp-mail-history/dto/create-otp-mail-history.dto';
import { OtpHistoryService } from 'src/otp-mail-history/otp-mail-history.service';
import {
  responseWithData,
  responseWithOutData,
} from 'src/utility/response.dto';
import { responseStringDto } from 'src/members/dto/response-member.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateOtp } from './dto/update-otp-dto';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('Otp-Mail')
@Controller('otp-mail')
export class OtpMailController {
  constructor(
    private readonly otpMailService: OtpMailService,
    private readonly otpHistoryService: OtpHistoryService,
    private readonly memberService: MembersService,
    private readonly JwtService: JwtService,
    private readonly MailService: MailerService,
  ) {}

  @Public()
  @Post('/check-otp-register')
  async create(@Body() checkOtpMailDto: CheckOtpMailDto) {
    const { otp, ref_code } = checkOtpMailDto;
    const checkStatus = await this.otpMailService.checkStatusEmail(
      otp,
      ref_code,
    );

    try {
      if (checkStatus !== null) {
        const otpHistoryDto = new CreateOtpHistoryDto();
        otpHistoryDto.is_deleted = false;
        otpHistoryDto.otp = otp;
        otpHistoryDto.email = checkStatus.email;
        const datenow = getTime();
        otpHistoryDto.created = datenow;
        otpHistoryDto.created_by = 1;
        otpHistoryDto.modified = datenow;
        otpHistoryDto.modified_by = 1;

        const insertData = await this.otpHistoryService.create(otpHistoryDto);

        if (insertData) {
          const id = checkStatus.id;
          const deleteData = await this.otpMailService.delete(id);
        }
        const email = checkStatus.email;

        const updateActive = await this.memberService.updateActiveMember(email);
        const payload = { sub: updateActive.id, username: updateActive.email };
        const access_tokens = await this.JwtService.signAsync(payload);
        if (updateActive) {
          return {
            data: email,
            access_token: access_tokens,
            status: 'success',
            code: '016',
            message_code: 'success_verify',
            message: 'ตรวจสอบข้อมูลถูกต้อง',
          };
        } else {
          return {
            status: 'success',
            code: '019',
            message_code: 'invalid_email',
            message: 'อีเมลไม่ถูกต้อง',
          };
        }
      } else {
        return {
          status: 'success',
          code: '019',
          message_code: 'invalid_email',
          message: 'อีเมลไม่ถูกต้อง',
        };
      }
    } catch (e) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Something went wrong',
        },
        500,
      );
    }
  }

  @Public()
  @Post('/check-otp-password')
  async update_password(
    @Body() checkOtpMailDto: CheckOtpMailDto,
  ): Promise<responseStringDto> {
    const { otp, ref_code } = checkOtpMailDto;
    const unique_id = generateMd5(ref_code);
    const getDate = getTime();
    const checkStatus = await this.otpMailService.checkStatusEmail(
      otp,
      ref_code,
    );
    const checkExpiretime = getDate.getTime() - checkStatus.expire_time.getTime()
    
    
    try {
      if(checkExpiretime < 1){
        if (checkStatus !== null) {
          
          const otpHistoryDto = new CreateOtpHistoryDto();
          otpHistoryDto.is_deleted = false;
          otpHistoryDto.otp = otp;
          otpHistoryDto.email = checkStatus.email;
          const datenow = getTime();
          otpHistoryDto.created = datenow;
          otpHistoryDto.created_by = 1;
          otpHistoryDto.modified = datenow;
          otpHistoryDto.modified_by = 1;

          const insertData = await this.otpHistoryService.create(otpHistoryDto);

          if (insertData) {
            const id = checkStatus.id;
            const deleteData = await this.otpMailService.delete(id);
          }

          const email = checkStatus.email;

          const unique_link = unique_id;

          const updateActive = await this.memberService.updateMd5Member(
            email,
            unique_id,
          );
          if (email) {
            return {
              data: unique_link,
              status: 'success',
              code: '016',
              message_code: 'success_change_pass',
              message: 'เปลี่ยนรหัสผ่านสำเร็จ',
            };
          }
        } else {
          return {
            status: 'success',
            code: '034',
            message_code: 'Expire_Time',
            message: 'เกิดเวลาที่กำหนด',
          };
        }
      }else{
        return {
          status: 'success',
          code: '019',
          message_code: 'invalid_email',
          message: 'อีเมลไม่ถูกต้อง',
        };
      }
    } catch (e) {
      throw new HttpException(
        {
          status: 'error',
          message: 'Something went wrong',
        },
        500,
      );
    }
  }

  @Public()
  @Post('resend-otp')
  async resendOtp(@Query('email') email: string) {
    const checkEmailOtp = await this.otpMailService.checkIdbyEmail(email);
    const checkUserId = await this.memberService.checkMemberIdbyEmail(email);
    if (checkEmailOtp) {
      const refCode = generateRefCode(6);
      let otp;
      let checkOtp = null;
      do {
        otp = getOtp();
        checkOtp = await this.otpMailService.checkDuplicateOtp(otp, refCode);
      } while (checkOtp !== null);
      const getDate = getTime();
      const expireTime = getTime10();
      const updateOtpEdit = new UpdateOtp();
      updateOtpEdit.modified = getDate;
      updateOtpEdit.modified_by = checkUserId.id;
      updateOtpEdit.otp = otp;
      updateOtpEdit.ref_code = refCode;
      updateOtpEdit.expire_time = expireTime;
      const OtpEmailId = checkEmailOtp.id;
      const resultsUpdateOtp = await this.otpMailService.updateOtp(
        OtpEmailId,
        updateOtpEdit,
      );
      if (resultsUpdateOtp) {
        await this.MailService.sendMail({
          to: email,
          subject: 'Sender Otp',
          template: 'welcome', // assuming you have a 'welcome' template in the configured directory
          text: `OTP = ${otp}`,
        });
        return {
          code: '005',
          message_code: 'success_update',
          message: 'ปรับปรุงข้อมูลสำเร็จ',
          status: 'success',
          data: refCode,
        };
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
}
