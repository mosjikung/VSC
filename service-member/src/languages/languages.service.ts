import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Languages } from './entities/language.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/libs/common/src';

@Injectable()
export class LanguagesService extends CrudService<Languages>{
  constructor(
    @InjectRepository(Languages)
    private readonly languagesRepository: Repository<Languages>,
  ) {
    super(languagesRepository);
  }

}
