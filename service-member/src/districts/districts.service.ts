import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { CrudService } from 'src/libs/common/src';
import { Districts } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsService extends CrudService<Districts>{
  constructor(
    @InjectRepository(Districts)
    private readonly districtRepository: Repository<Districts>,
    
  ) {
    super(districtRepository);
  }


}
