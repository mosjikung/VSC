import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpException,
  Req,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpMailService } from 'src/otp-mail/otp-mail.service';
import { CreateOtpMailDto } from 'src/otp-mail/dto/create-otp-mail.dto';
import {
  generateRefCode,
  getOtp,
  getTime,
  getTime10,
} from 'src/utility/utility';
import { ChangePasswordDto } from './dto/change-password-member.dto';
import { Request } from 'express';
import { ChangePasswordForgotDto } from './dto/change-password-forgot-member.dto';
import { UpdateMemberDataDto } from './dto/update-member-data.dto';
import { Public } from 'src/decorators/public.decorator';
import { responseStringDto } from './dto/response-member.dto';
import { responseWithOutData } from 'src/utility/response.dto';
import { MemberAddressesService } from 'src/member-addresses/member-addresses.service';
import { CreateMemberAddressDto } from 'src/member-addresses/dto/create-member-address.dto';
import { UpdateOtp } from '../otp-mail/dto/update-otp-dto';
import { MinioGlobalService } from 'src/minio/minio-global.service';

@ApiTags('Member')
@Controller('member')
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly mailService: MailerService,
    private readonly optMailService: OtpMailService,
    private readonly memberAddressService: MemberAddressesService,
    private readonly minioService:MinioGlobalService
  ) {}
  @Post('register')
  @Public()
  async create(
    @Body(new ValidationPipe()) createMemberDto: CreateMemberDto,
  ): Promise<responseStringDto> {
    // duplicate email check first
    await this.membersService.duplicateEmailCheck(createMemberDto.email);

    const hash = await bcrypt.hash(createMemberDto.password, 10);
    createMemberDto.email = createMemberDto.email;
    createMemberDto.password = hash;
    const resultsCreate = await this.membersService.create(createMemberDto);
    if (resultsCreate) {
      const refCode = generateRefCode(6);
      let otp;
      let checkOtp = null;

      // Repeat until checkOtp is null
      do {
        otp = getOtp();
        checkOtp = await this.optMailService.checkDuplicateOtp(otp, refCode);
      } while (checkOtp !== null);

      const createOtpMailDto = new CreateOtpMailDto();
      const dateTime = getTime();
      createOtpMailDto.email = createMemberDto.email;
      createOtpMailDto.is_deleted = false;
      createOtpMailDto.created = dateTime;
      createOtpMailDto.created_by = 1;
      createOtpMailDto.modified = dateTime;
      createOtpMailDto.modified_by = 1;
      createOtpMailDto.ref_code = refCode;
      createOtpMailDto.otp = otp;

      const status = this.optMailService.create(createOtpMailDto);

      await this.mailService.sendMail({
        to: createMemberDto.email,
        subject: 'Sender Otp',
        template: 'welcome', // assuming you have a 'welcome' template in the configured directory
        text: `OTP = ${otp}`,
      });
      return {
        data: refCode,
        code: '003',
        message_code: 'success_create',
        message: 'บันทึกข้อมูลสำเร็จ',
        status: 'success',
      };
    }
  }

  @ApiBearerAuth()
  @Patch('change-password')
  async changePassword(
    @Req() request: Request,
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<responseWithOutData> {
    const user = request.user;
    const email = user['username'];

    const hash = await bcrypt.hash(changePasswordDto.newpassword, 10);
    changePasswordDto.newpassword = hash;
    const isEmailExist = await this.membersService.findOne({
      select: {
        email: true,
        password: true,
      },
      where: { email: email },
    });
    if (isEmailExist) {
      const updated = await this.membersService.updateMemberbyId(
        isEmailExist.id,
        changePasswordDto.newpassword,
      );
      return {
        code: '016',
        message_code: 'success_change_pass',
        message: 'เปลี่ยนรหัสผ่านสำเร็จ',
        status: 'success',
      };
    } else {
      throw new HttpException(
        {
          code: '019',
          message_code: 'invalid_email',
          message: 'อีเมลไม่ถูกต้อง',
          status: 'success',
        },
        404,
      );
    }
  }

  @Public()
  @Get('forgot-password/:email')
  async forgetPassword(
    @Param('email') email: string,
  ): Promise<responseStringDto> {
    const isEmailExist = await this.membersService.findOne({
      select: {
        email: true,
      },
      where: { email: email },
    });

    if (isEmailExist) {
      const checkDuplicateEmail = await this.optMailService.checkEmailDuplicate(
        email,
      );
      if (checkDuplicateEmail === null) {
        const refCode = generateRefCode(6);
        let otp;
        let checkOtp = null;
        const expireTime = getTime10();
        do {
          otp = getOtp();
          checkOtp = await this.optMailService.checkDuplicateOtp(otp, refCode);
        } while (checkOtp !== null);
        if (checkOtp === null) {
          const createOtpMailDto = new CreateOtpMailDto();
          const dateTime = getTime();
          createOtpMailDto.email = email;
          createOtpMailDto.is_deleted = false;
          createOtpMailDto.created = dateTime;
          createOtpMailDto.created_by = 1;
          createOtpMailDto.modified = dateTime;
          createOtpMailDto.modified_by = 1;
          createOtpMailDto.ref_code = refCode;
          createOtpMailDto.otp = otp;
          createOtpMailDto.expire_time = expireTime;

          const status = this.optMailService.create(createOtpMailDto);

          await this.mailService.sendMail({
            to: email,
            subject: 'Sender Otp',
            template: 'welcome', // assuming you have a 'welcome' template in the configured directory
            text: `OTP = ${otp}`,
          });
          return {
            data: refCode,
            code: '003',
            message_code: 'success_create',
            message: 'บันทึกข้อมูลสำเร็จ',
            status: 'success',
          };
        }
      } else {
        const checkEmailOtp = await this.optMailService.checkIdbyEmail(email);
        const checkUserId = await this.membersService.checkMemberIdbyEmail(
          email,
        );
        const refCode = generateRefCode(6);
        let otp;
        let checkOtp = null;
        const expireTime = getTime10();
        do {
          otp = getOtp();
          checkOtp = await this.optMailService.checkDuplicateOtp(otp, refCode);
          
        } while (checkOtp !== null);
        const getDate = getTime();
        const updateOtpEdit = new UpdateOtp();
        updateOtpEdit.modified = getDate;
        updateOtpEdit.modified_by = checkUserId.id;
        updateOtpEdit.otp = otp;
        updateOtpEdit.ref_code = refCode;
        updateOtpEdit.expire_time = expireTime;
        const OtpEmailId = checkEmailOtp.id;
        const resultsUpdateOtp = await this.optMailService.updateOtp(
          OtpEmailId,
          updateOtpEdit,
        );
        if (resultsUpdateOtp) {
          await this.mailService.sendMail({
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
    } else {
      return {
        code: '019',
        message_code: 'invalid_email',
        message: 'อีเมลไม่ถูกต้อง',
        status: 'success',
      };
    }
  }

  @Public()
  @Patch('reset-password/:uniqueId')
  async changePasswordForgot(
    @Param('uniqueId') uniqueId: string,
    @Body(new ValidationPipe())
    changePasswordForgotDto: ChangePasswordForgotDto,
  ): Promise<responseWithOutData> {
    const hash = await bcrypt.hash(changePasswordForgotDto.newpassword, 10);
    changePasswordForgotDto.newpassword = hash;
    const isEmailExist = await this.membersService.findOne({
      select: {
        id: true,
        email: true,
      },
      where: { unique_link: uniqueId },
    });

    if (isEmailExist) {
      const updated = await this.membersService.updateMemberbyId(
        isEmailExist.id,
        changePasswordForgotDto.newpassword,
      );
      return {
        code: '016',
        message_code: 'success_change_pass',
        message: 'เปลี่ยนรหัสผ่านสำเร็จ',
        status: 'success',
      };
    } else {
      throw new HttpException(
        {
          code: '019',
          message_code: 'invalid_email',
          message: 'อีเมลไม่ถูกต้อง',
          success: 'success',
        },
        404,
      );
    }
  }

  @ApiBearerAuth()
  @Patch('update-member')
  async update(
    @Req() request: Request,
    @Body() updateMemberDataDto: UpdateMemberDataDto,
  ): Promise<responseWithOutData> {
    const user = request.user;
    const email = user['username'];
    const id = user['sub'];

    const userUpdateData = this.membersService.update(id, updateMemberDataDto);
    const getDate = getTime();
    const createMemberAddressDto = new CreateMemberAddressDto();
    createMemberAddressDto.created = getDate;
    createMemberAddressDto.modified = getDate;
    createMemberAddressDto.created_by = id;
    createMemberAddressDto.modified_by = id;
    createMemberAddressDto.member_id = id;
    createMemberAddressDto.address = updateMemberDataDto.address;
    createMemberAddressDto.province_id = updateMemberDataDto.province_id;
    createMemberAddressDto.district_id = updateMemberDataDto.district_id;
    createMemberAddressDto.subdistrict_id = updateMemberDataDto.subdistrict_id;
    createMemberAddressDto.zip_code = updateMemberDataDto.zip_code;
    const userAddressData = this.memberAddressService.createMemberAddress(
      createMemberAddressDto,
    );

    if (userUpdateData) {
      return {
        code: '005',
        message_code: 'success_update',
        message: 'ปรับปรุงข้อมูลสำเร็จ',
        status: 'success',
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
