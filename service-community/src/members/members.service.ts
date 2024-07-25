import { Members } from 'src/members/entities/member.entity';
import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MembersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Members)
    private readonly memberRepository: Repository<Members>,
  ) {}

  decodeToken(token: string) {
    try {
      const decoded = this.jwtService.decode(token, { json: true });
      return decoded;
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
  
  async getMember(
    user_id: number,
  ): Promise<Members[]> {
    const whereCondition = {
      is_deleted: false,
    };

    if (user_id !== 0) {
      whereCondition['id'] = user_id;
    }

    return this.memberRepository.find({
      where: whereCondition,
      order: {
        id: 'DESC',
      },
    });
  }
}
