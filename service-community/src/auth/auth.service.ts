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
  async accessToken(id: number, username: string) {
    const payload = { sub: id, username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
