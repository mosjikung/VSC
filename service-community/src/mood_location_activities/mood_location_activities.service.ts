import { Injectable } from '@nestjs/common';
import { CreateMoodLocationActivityDto } from './dto/create-mood_location_activity.dto';
import { UpdateMoodLocationActivityDto } from './dto/update-mood_location_activity.dto';

@Injectable()
export class MoodLocationActivitiesService {
  create(createMoodLocationActivityDto: CreateMoodLocationActivityDto) {
    return 'This action adds a new moodLocationActivity';
  }

  findAll() {
    return `This action returns all moodLocationActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moodLocationActivity`;
  }

  update(id: number, updateMoodLocationActivityDto: UpdateMoodLocationActivityDto) {
    return `This action updates a #${id} moodLocationActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} moodLocationActivity`;
  }
}
