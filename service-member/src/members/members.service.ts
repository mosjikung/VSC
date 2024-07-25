import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Members } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs';
import { getTime } from 'src/utility/utility';
import { CrudService } from 'src/libs/common/src';
import { responseWithData, responseWithOutData } from 'src/utility/response.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateMemberDataDto } from './dto/update-member-data.dto';


@Injectable()
export class MembersService extends CrudService<Members>{
  constructor(
    @InjectRepository(Members)
    private readonly memberRepository: Repository<Members>,

  ) {
    super(memberRepository);
  }
  async create(createMemberDto: CreateMemberDto): Promise<Members> {
    const email = createMemberDto.email;
    const checkDuplicate = await this.memberRepository.findOne({ where: { email } });
    
    if (!checkDuplicate) {
      const newUser = this.memberRepository.create(createMemberDto);
      return await this.memberRepository.save(newUser);
    } else {
      throw new NotFoundException( {
        code: '018',
        message_code: 'duplicate_email',
        message: 'อีเมลถูกใช้งานแล้ว',
        is_actived:checkDuplicate.is_activated,
        status:'success'
      })
    }
  }

  async duplicateEmailCheck(email: string):Promise<responseWithOutData> {
    let user: Members;
    user = await this.findOne({ where: { email: email } });
    if (user) {
      return {
        code: '018',
        message_code: 'duplicate_email',
        message: 'อีเมลถูกใช้งานแล้ว',
        is_actived:user.is_activated,
        status:'success'
      };
    }
  }

  async duplicateUsernameCheck(username: string):Promise<responseWithOutData> {
    let user: Members;
    user = await this.findOne({ where: { username: username } });
    if (user) {
      return {
        code: '028',
        status:'success',
        message_code: 'duplicate_username',
        message: 'ชื่อผู้ใช้ถูกใช้งานแล้ว',
        is_actived:user.is_activated,
      };
    }
  }

  async validateUserByEmail(email: string, password: string) {
    const user = await this.findOne({ where: { email: email, is_activated:true } });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async validateUserByUsername(email: string, password: string) {
    const user = await this.findOne({ where: { email: email , is_activated:true}});
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async updateMemberbyId(id: number, password:string): Promise<Members> {
    
      let user = await this.memberRepository.findOneBy({id:id})

      const dateTime = getTime()
      const updateMemberDto = new UpdateMemberDto();
      updateMemberDto.password = password;
      updateMemberDto.modified = dateTime;
      updateMemberDto.modified_by = user.id
    
      
      user = {
        ...user,
        ...updateMemberDto
      }
      const toUpdate = await this.memberRepository.save(user)
      return toUpdate;
    
  }

  async updateActiveMember(email:string){
    let member = await this.memberRepository.findOneBy({email:email})
    member.is_activated = true;
    const toUpdate = await this.memberRepository.save(member)
    return toUpdate;
  }

  async updateMd5Member(email:string , unique_link:string){
    let member = await this.memberRepository.findOneBy({email:email})
    member.unique_link = unique_link;
    const toUpdate = await this.memberRepository.save(member)
    return toUpdate;
  }


  async checkMemberIdbyEmail(email:string): Promise<Members>{
    let user = await this.memberRepository.findOneBy({email:email})
    return user

  }


  async updateById1(id: number, updateMemberDataDto: UpdateMemberDataDto): Promise<Members> {
    try {
      const data = await this.memberRepository.findOneBy({id:id})// หรือ findById(id)
     
      if (!data) {
        throw new NotFoundException({
          error_code: 4040,
          message_code: 'memberNotFound',
        });
      }

      const dateNow: Date = new Date(dayjs().utcOffset(7).format('YYYY-MM-DD HH:mm:ss'));
      updateMemberDataDto.modified = dateNow;

      const updatedMember = await this.memberRepository.save({
        ...data,
        ...updateMemberDataDto,
      });

      return updatedMember;
    } catch (error) {
      throw error;
    }
  }
  
}
