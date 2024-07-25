import { Injectable } from '@nestjs/common';
import { CreateMoodMemberPhotoDto } from './dto/create-mood_member_photo.dto';
import { UpdateMoodMemberPhotoDto } from './dto/update-mood_member_photo.dto';

@Injectable()
export class MoodMemberPhotosService {
  create(createMoodMemberPhotoDto: CreateMoodMemberPhotoDto) {
    return 'This action adds a new moodMemberPhoto';
  }

  findAll() {
    return `This action returns all moodMemberPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moodMemberPhoto`;
  }

  update(id: number, updateMoodMemberPhotoDto: UpdateMoodMemberPhotoDto) {
    return `This action updates a #${id} moodMemberPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} moodMemberPhoto`;
  }
}
