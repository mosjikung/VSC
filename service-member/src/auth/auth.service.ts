import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Members } from 'src/members/entities/member.entity';
import { MembersService } from 'src/members/members.service';
//import { SocialMember } from 'src/social_members/entities/social_member.entity';
//import { SocialMembersService } from 'src/social_members/social_members.service';

@Injectable()
export class AuthService {
  constructor(
    private membersService: MembersService,
    private readonly jwtService: JwtService,
    //private socialMemberService: SocialMembersService,
  ) {}

  async login(member: Members) {
    // validate user ที่ login เข้ามา
    try {
      // validata user ด้วย username ก่อน
      
      let userLogin = await this.membersService.validateUserByUsername(
        member.email,
        member.password,
      );

      // ถ้าไม่พบ user ด้วย username ก็จะหาด้วย email
      if (!userLogin) {
        userLogin = await this.membersService.validateUserByEmail(
          member.username,
          member.password,
        );
      }
      
      // ถ้าพบ user ให้ส่ง access token กลับไป
      if (userLogin) {
        return {
          code: '012',
          message_code: 'success_login',
          message: 'เข้าสู่ระบบสำเร็จ',
          is_activate:userLogin.is_activated,
          user_id : userLogin.id,
          data: await this.accessToken(userLogin.id, userLogin.email),
        };
      } else {
        return {
          code: '026',
          message_code: 'invalid_email_password',
          message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        };
      }
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          
          code: '022',
          message_code: 'internal_server_error',
          message: 'internal server error',
        },
        500,
      );
    }
  }

  // async loginSocial(member: SocialMember) {
  //   const memberSocial = await this.socialMemberService.findOne({
  //     select: {
  //       id: true,
  //       email: true,
  //       social_type: true,
  //       member_id: true,
  //       social_id: true,
  //     },
  //     where: { social_id: member.social_id },
  //   });
  //   if (memberSocial) {
  //     return {
  //       status: 'success',
  //       message_code: 'success_login',
  //       code: '012',
  //       data: await this.accessToken(
  //         memberSocial.member_id,
  //         memberSocial.email,
  //       ),
  //     };
  //   } else {
  //     throw new HttpException(
  //       {
  //         status: 'un_success',
  //         code: '031',
  //         message_code: 'not_registered_social',
  //       },
  //       401,
  //     );
  //   }
  // }

  async accessToken(id: number, username: string) {
    const payload = { sub: id, username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
