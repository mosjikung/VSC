import { getTime } from 'src/utility/utility';
import { Injectable } from '@nestjs/common';
import { CreateMoodCommentHistoryDto } from './dto/create-mood_comment_history.dto';
import { UpdateMoodCommentHistoryDto } from './dto/update-mood_comment_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MoodCommentHistory } from './entities/mood_comment_history.entity';
import { Repository } from 'typeorm';
import { MoodMemberDaily } from 'src/mood_member_dailies/entities/mood_member_daily.entity';

@Injectable()
export class MoodCommentHistoriesService {
  constructor(
    @InjectRepository(MoodCommentHistory)
    private readonly moodCommentHistoryRepository: Repository<MoodCommentHistory>,
  ) {}

  create(createMoodCommentHistoryDto: CreateMoodCommentHistoryDto) {
    return this.moodCommentHistoryRepository.save(createMoodCommentHistoryDto);
  }

  async update(id: number, mood_member_daily_id: number, description: string) {
    let moodCommentHistory = await this.moodCommentHistoryRepository.findOneBy({
      id: id,
    });

    const dateTime = getTime();
    moodCommentHistory.modified = dateTime;
    moodCommentHistory.modified_by = moodCommentHistory.created_by;
    moodCommentHistory.mood_member_daily_id = mood_member_daily_id;
    moodCommentHistory.description = description;

    const toUpdate =
      await this.moodCommentHistoryRepository.save(moodCommentHistory);

    // const mood_member_dailies = await this.moodMemberDailyRepository.find({
    //   select: {
    //     id: true,
    //     created: true,
    //   },
    //   where: {
    //     id: mood_member_daily_id,
    //   },
    //   order: {
    //     created: 'ASC',
    //   },
    // });
    // console.log(mood_member_dailies);

    return toUpdate;
  }

  async delete(id: number, member_id: number) {
    let moodCommentHistory = await this.moodCommentHistoryRepository.findOneBy({
      id: id,
    });

    const dateTime = getTime();
    moodCommentHistory.deleted = dateTime;
    moodCommentHistory.deleted_by = member_id;
    moodCommentHistory.is_deleted = true;

    const toUpdate =
      await this.moodCommentHistoryRepository.save(moodCommentHistory);
    return toUpdate;
  }

  async countComment(id: number) {
    return this.moodCommentHistoryRepository.count({
      where: { mood_member_daily_id: id },
    });
  }
}
