import { request } from 'http';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { Between } from 'typeorm';

import { CreateCommunityFeedDto } from './dto/create-community_feed.dto';
import { UpdateCommunityFeedDto } from './dto/update-community_feed.dto';
import { CommunityFeed } from './entities/community_feed.entity';
import { CommunityPhoto } from 'src/community_photos/entities/community_photo.entity';

@Injectable()
export class CommunityFeedsService {
  constructor(
    @InjectRepository(CommunityFeed)
    private readonly communityFeedRepository: Repository<CommunityFeed>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    community_type_id: number,
  ): Promise<CommunityFeed[]> {
    let offset = page * limit;
    offset = offset - limit;

    const whereCondition = {
      is_deleted: false,
    };

    return this.communityFeedRepository.find({
      relations: ['member', 'community_photo'],
      select: {
        id: true,
        created: true,
        modified: true,
        topic: true,
        description: true,
        is_share: true,
        is_comment: true,
        is_like: true,
        member: {
          id: true,
          username: true,
          avatar_name: true,
          avatar_img: true,
          avatar_path: true,
        },
        community_photo: {
          id: true,
          file_name: true,
          file_path: true,
          file_type: true,
          file_size: true,
        },
      },
      where: whereCondition,
      order: {
        id: 'DESC',
      },
      skip: offset,
      take: limit,
    });
  }
}
