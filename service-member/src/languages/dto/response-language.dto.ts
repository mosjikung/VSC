
import { IsDateString, IsInt, IsString, IsBoolean } from 'class-validator';
import { Languages } from '../entities/language.entity';

export class responseLanguageDto{
    data?: Languages;
    status: string;
    message_code: string;
    code: string;
    message:string;

}