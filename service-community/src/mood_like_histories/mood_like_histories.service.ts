import { Injectable } from '@nestjs/common';
import { CreateMoodLikeHistoryDto } from './dto/create-mood_like_history.dto';
import { UpdateMoodLikeHistoryDto } from './dto/update-mood_like_history.dto';
import { CrudService } from 'src/common/src';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoodLikeHistory } from './entities/mood_like_history.entity';

@Injectable()
export class MoodLikeHistoriesService extends CrudService<MoodLikeHistory>{
  constructor(
    @InjectRepository(MoodLikeHistory)
    private readonly moodLikeHistoryRepository: Repository<MoodLikeHistory>,
  ) {
    super(moodLikeHistoryRepository);
  }

  async createMoodLike(createMood): Promise<any> {
    console.log(createMood)
    const moodLikeHistory = this.moodLikeHistoryRepository.create(createMood);
    return await this.moodLikeHistoryRepository.save(moodLikeHistory);
}
}
