import { Injectable } from '@nestjs/common';
import { CreateMoodFeelingLevelDto } from './dto/create-mood_feeling_level.dto';
import { UpdateMoodFeelingLevelDto } from './dto/update-mood_feeling_level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoodFeelingLevel } from './entities/mood_feeling_level.entity';

@Injectable()
export class MoodFeelingLevelsService {
  constructor(
    @InjectRepository(MoodFeelingLevel)
    private readonly moodFeelingLevelRepository: Repository<MoodFeelingLevel>,
  ) {}

  async getMoodLevel(): Promise<MoodFeelingLevel[]> {
    const whereCondition = {
      is_deleted: false,
    };

    return this.moodFeelingLevelRepository.find({
      select: {
        id: true,
        name: true,
        value: true,
      },
      where: whereCondition,
      order: {
        id: 'ASC',
      },
    });
  }
}
