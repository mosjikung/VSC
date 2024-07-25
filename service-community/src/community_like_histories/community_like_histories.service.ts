import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getTime } from 'src/utility/utility';

import { CreateCommunityLikeHistoryDto } from './dto/create-community_like_history.dto';
import { UpdateCommunityLikeHistoryDto } from './dto/update-community_like_history.dto';
import { CommunityLikeHistory } from './entities/community_like_history.entity';

@Injectable()
export class CommunityLikeHistoriesService {
  constructor(
    @InjectRepository(CommunityLikeHistory)
    private readonly communityLikeHistoryRepository: Repository<CommunityLikeHistory>,
  ) {}

  create(createCommunityLikeHistoryDto: CreateCommunityLikeHistoryDto) {
    return this.communityLikeHistoryRepository.save(
      createCommunityLikeHistoryDto,
    );
  }

  update(updateCommunityLikeHistoryDto: UpdateCommunityLikeHistoryDto) {
    return this.communityLikeHistoryRepository.save(
      updateCommunityLikeHistoryDto,
    );
  }

  checkData(id: number) {
    return this.communityLikeHistoryRepository.count({
      where: {
        id: id,
        is_deleted: false,
      },
    });
  }

  checkDataReference(community_feed_id: number, created_by: number) {
    const whereCondition = {
      created_by: created_by,
      is_deleted: false,
      community_feed_id: community_feed_id,
    };

    return this.communityLikeHistoryRepository.find({
      select: {
        id: true,
      },
      where: whereCondition,
    });
  }
}
