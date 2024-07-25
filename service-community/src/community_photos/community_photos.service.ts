import { Injectable } from '@nestjs/common';
import { CreateCommunityPhotoDto } from './dto/create-community_photo.dto';
import { UpdateCommunityPhotoDto } from './dto/update-community_photo.dto';

@Injectable()
export class CommunityPhotosService {
  create(createCommunityPhotoDto: CreateCommunityPhotoDto) {
    return 'This action adds a new communityPhoto';
  }

  findAll() {
    return `This action returns all communityPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communityPhoto`;
  }

  update(id: number, updateCommunityPhotoDto: UpdateCommunityPhotoDto) {
    return `This action updates a #${id} communityPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} communityPhoto`;
  }
}
