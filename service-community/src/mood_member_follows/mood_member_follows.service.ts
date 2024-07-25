import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from 'src/common/src';
import { Between, Repository } from 'typeorm';

import { CreateMoodMemberFollowDto } from './dto/create-mood_member_follow.dto';
import { UpdateMoodMemberFollowDto } from './dto/update-mood_member_follow.dto';
import { MoodMemberFollow } from './entities/mood_member_follow.entity';

@Injectable()
export class MoodMemberFollowsService extends CrudService<MoodMemberFollow> {
  constructor(
    @InjectRepository(MoodMemberFollow)
    private readonly moodMemberFollowRepository: Repository<MoodMemberFollow>,
  ) {
    super(moodMemberFollowRepository);
  }

  async follower(user_id: number): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    return this.moodMemberFollowRepository.count({
      where: {
        created_by: user_id,
        is_deleted: false,
      },
    });
  }

  async following(user_id: number): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    return this.moodMemberFollowRepository.count({
      where: {
        member_id: user_id,
        is_deleted: false,
      },
    });
  }

  async follow(user_id: number, follow_user_id: number): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    return this.moodMemberFollowRepository.count({
      where: {
        created_by: user_id,
        member_id: follow_user_id,
        is_deleted: false,
        created: Between(today, tomorrow),
      },
    });
  }

  async createMoodMemberFollow(createMood): Promise<any> {
    console.log(createMood);
    const moodLikeHistory = this.moodMemberFollowRepository.create(createMood);
    return await this.moodMemberFollowRepository.save(moodLikeHistory);
  }
}
