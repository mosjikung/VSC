import { Injectable } from '@nestjs/common';
import { CreateMoodShareHistoryDto } from './dto/create-mood_share_history.dto';
import { UpdateMoodShareHistoryDto } from './dto/update-mood_share_history.dto';

@Injectable()
export class MoodShareHistoriesService {
  create(createMoodShareHistoryDto: CreateMoodShareHistoryDto) {
    return 'This action adds a new moodShareHistory';
  }

  findAll() {
    return `This action returns all moodShareHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moodShareHistory`;
  }

  update(id: number, updateMoodShareHistoryDto: UpdateMoodShareHistoryDto) {
    return `This action updates a #${id} moodShareHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} moodShareHistory`;
  }
}
