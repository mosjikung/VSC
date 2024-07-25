import { IsDateString, IsInt, IsString, IsBoolean } from 'class-validator';
import { Members } from '../entities/member.entity';

export class AAAADto {
  id: number;
  name: string;
}
export class responseMemberDto {
  data?: Members;
  status: string;
  message_code: string;
  code: string;
}

export class responseStringDto{
  data?: string;
  status: string;
  message_code: string;
  code: string;
  message:string;
}