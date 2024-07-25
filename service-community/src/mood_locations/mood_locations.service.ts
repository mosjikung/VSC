import { Injectable } from '@nestjs/common';
import { CreateMoodLocationDto } from './dto/create-mood_location.dto';
import { UpdateMoodLocationDto } from './dto/update-mood_location.dto';

@Injectable()
export class MoodLocationsService {
  create(createMoodLocationDto: CreateMoodLocationDto) {
    return 'This action adds a new moodLocation';
  }

  findAll() {
    return `This action returns all moodLocations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moodLocation`;
  }

  update(id: number, updateMoodLocationDto: UpdateMoodLocationDto) {
    return `This action updates a #${id} moodLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} moodLocation`;
  }
}
