import { Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provinces } from './entities/province.entity';
@Injectable()

export class ProvincesService {
  constructor(
    @InjectRepository(Provinces)
    private readonly provinceRepository: Repository<Provinces>,
  ) {}
  create(createProvinceDto: CreateProvinceDto) {
    return 'This action adds a new province';
  }

  async findAll():Promise<Provinces[]> {
    const provinceData = this.provinceRepository.find();
    return provinceData;
  }

  // async findAllWithDistricts(): Promise<Provinces[]> {
  //   return this.provinceRepository.find({
  //     relations: ['districts','districts.subdistricts'],  // ดึงข้อมูล provinces พร้อม districts
  //   });
  // }

}
