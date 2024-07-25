import { Injectable } from '@nestjs/common';
import { CreateCommunityTypeDto } from './dto/create-community_type.dto';
import { UpdateCommunityTypeDto } from './dto/update-community_type.dto';

@Injectable()
export class CommunityTypesService {
  create(createCommunityTypeDto: CreateCommunityTypeDto) {
    return 'This action adds a new communityType';
  }

  findAll() {
    return `This action returns all communityTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communityType`;
  }

  update(id: number, updateCommunityTypeDto: UpdateCommunityTypeDto) {
    return `This action updates a #${id} communityType`;
  }

  remove(id: number) {
    return `This action removes a #${id} communityType`;
  }
}
