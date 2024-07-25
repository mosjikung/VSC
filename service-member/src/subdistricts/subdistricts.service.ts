import { Injectable } from '@nestjs/common';
import { CreateSubdistrictDto } from './dto/create-subdistrict.dto';
import { UpdateSubdistrictDto } from './dto/update-subdistrict.dto';
import { CrudService } from 'src/libs/common/src';
import { Subdistricts } from './entities/subdistrict.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubdistrictsService extends CrudService<Subdistricts>{
  constructor(
    @InjectRepository(Subdistricts)
    private readonly subdistrictRepository: Repository<Subdistricts>,
    
  ) {
    super(subdistrictRepository);
  }
}
