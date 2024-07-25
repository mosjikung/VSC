import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateMoodFeelingValueDto } from './dto/create-mood_feeling_value.dto';
import { UpdateMoodFeelingValueDto } from './dto/update-mood_feeling_value.dto';
import { MoodFeelingValue } from './entities/mood_feeling_value.entity';
import { request } from 'http';

@Injectable()
export class MoodFeelingValuesService {
  constructor(
    @InjectRepository(MoodFeelingValue)
    private readonly moodFeelingValueRepository: Repository<MoodFeelingValue>,
  ) {}

  create(createMoodFeelingValueDto: CreateMoodFeelingValueDto) {
    return 'This action adds a new moodFeelingValue';
  }

  async getAllFeelingList(): Promise<MoodFeelingValue[]> {
    return this.moodFeelingValueRepository.find({
      select: {
        id: true,
        name: true,
        value: true,
      },
      where: {
        is_deleted: false,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} moodFeelingValue`;
  }

  update(id: number, updateMoodFeelingValueDto: UpdateMoodFeelingValueDto) {
    return `This action updates a #${id} moodFeelingValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} moodFeelingValue`;
  }
}
