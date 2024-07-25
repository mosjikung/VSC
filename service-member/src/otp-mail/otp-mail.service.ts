import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOtpMailDto } from './dto/create-otp-mail.dto';
import { UpdateOtpMailDto } from './dto/update-otp-mail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OtpMail } from './entities/otp-mail.entity';
import { CrudService } from 'src/libs/common/src';
import { UpdateOtp } from './dto/update-otp-dto';


@Injectable()
export class OtpMailService extends CrudService<OtpMail>{
  constructor(
    @InjectRepository(OtpMail)
    private readonly otpMailRepository: Repository<OtpMail>
  ){
    super(otpMailRepository)
  }
  async create(createOtpMailDto: CreateOtpMailDto):Promise<OtpMail> {
    const saveMail = this.otpMailRepository.create(createOtpMailDto)
    return await this.otpMailRepository.save(saveMail)
  }

  async checkStatusEmail(otp:number , ref_code:string){
    const status =  await this.otpMailRepository.findOne({
      where:{
        otp,
        ref_code
      },
    })
    return status
  }

  async checkEmailDuplicate(email:string){
    const status = await this.otpMailRepository.findOne({where:{email}})
    return status
  }

  async checkDuplicateOtp(otp:number,ref_code:string){
    const status =  await this.otpMailRepository.findOne({
      where:{
        otp,
        ref_code,
      },
    })
    return status
  }

  async checkIdbyEmail(email:string){
    const emailData =  await this.otpMailRepository.findOne({
      where:{
        email,
      },
    })
    return  emailData
  }

  async delete(id: number):Promise<void> {
    const result = await this.otpMailRepository.delete({ id }); // ใช้ ID เป็นเงื่อนไขในการลบ
    if (result.affected === 0) { // ตรวจสอบว่ามีการลบหรือไม่
      throw new NotFoundException(`No OTP Mail found with ID ${id}`);
    }
  }

  async updateOtp(id: number, updateOtp: UpdateOtp): Promise<OtpMail> {
    await this.otpMailRepository.update(id, updateOtp);
    return this.otpMailRepository.findOneById(id);
}


  
}
