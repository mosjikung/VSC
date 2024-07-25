import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getTime } from 'src/utility/utility';

import { CreateCommunityCommentHistoryDto } from './dto/create-community_comment_history.dto';
import { UpdateCommunityCommentHistoryDto } from './dto/update-community_comment_history.dto';
import { RomoveCommunityCommentHistoryDto } from './dto/remove-community_comment_history.dto';
import { CommunityCommentHistory } from './entities/community_comment_history.entity';

@Injectable()
export class CommunityCommentHistoriesService {
  constructor(
    @InjectRepository(CommunityCommentHistory)
    private readonly moodCommunityCommentHistoryRepository: Repository<CommunityCommentHistory>,
  ) {}

  create(createCommunityCommentHistoryDto: CreateCommunityCommentHistoryDto) {
    return this.moodCommunityCommentHistoryRepository.save(
      createCommunityCommentHistoryDto,
    );
  }

  update(updateCommunityCommentHistoryDto: UpdateCommunityCommentHistoryDto) {
    return this.moodCommunityCommentHistoryRepository.save(
      updateCommunityCommentHistoryDto,
    );
  }

  remove(romoveCommunityCommentHistoryDto: RomoveCommunityCommentHistoryDto) {
    return this.moodCommunityCommentHistoryRepository.save(
      romoveCommunityCommentHistoryDto,
    );
  }

  checkData(id: number) {
    return this.moodCommunityCommentHistoryRepository.count({
      where: {
        id: id,
        is_deleted: false,
      },
    });
  }
}
