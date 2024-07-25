import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { CreateMoodMemberDailyDto } from './dto/create-mood_member_daily.dto';
import { UpdateMoodMemberDailyDto } from './dto/update-mood_member_daily.dto';
import { MoodMemberDaily } from './entities/mood_member_daily.entity';
import { request } from 'http';
import { Between } from 'typeorm';
import { getTime } from 'src/utility/utility';

@Injectable()
export class MoodMemberDailiesService {
  constructor(
    @InjectRepository(MoodMemberDaily)
    private readonly moodMemberDailyRepository: Repository<MoodMemberDaily>,
  ) {}

  create(user_id: number, createMoodMemberDailyDto: CreateMoodMemberDailyDto) {
    const dateTime = getTime();
    createMoodMemberDailyDto.created_by = user_id;
    createMoodMemberDailyDto.created = dateTime;
    createMoodMemberDailyDto.modified_by = user_id;
    createMoodMemberDailyDto.modified = dateTime;
    createMoodMemberDailyDto.is_deleted = false;
    createMoodMemberDailyDto.member_id = user_id;
    createMoodMemberDailyDto.count_like = 0;
    createMoodMemberDailyDto.count_share = 0;
    createMoodMemberDailyDto.count_comment = 0;
    return this.moodMemberDailyRepository.save(createMoodMemberDailyDto);
  }

  async findAll(
    page: number,
    limit: number,
    user_id: number,
  ): Promise<MoodMemberDaily[]> {
    let offset = page * limit;
    offset = offset - limit;
    const whereCondition = {
      is_deleted: false,
    };

    if (user_id !== 0) {
      whereCondition['member_id'] = user_id;
    }

    return (
      this.moodMemberDailyRepository
        .createQueryBuilder('mood_member_daily')
        .leftJoinAndSelect('mood_member_daily.member', 'member')
        .leftJoinAndSelect(
          'mood_member_daily.mood_feeling_level',
          'mood_feeling_level',
        )
        .leftJoinAndSelect(
          'mood_member_daily.location_activity',
          'location_activity',
        )
        // .leftJoinAndSelect('mood_member_daily.mood_like_history', 'mood_like_history')
        // .leftJoinAndSelect('mood_member_daily.mood_comment_history', 'mood_comment_history')
        .leftJoinAndSelect(
          'mood_member_daily.mood_like_history',
          'mood_like_history',
          'mood_like_history.created_by = :user_id',
          { user_id },
        )
        .leftJoinAndSelect(
          'mood_member_daily.mood_member_follow',
          'mood_member_follow',
          'mood_member_follow.member_id = :user_id',
          { user_id },
        )
        .select([
          'mood_member_daily.id',
          'mood_member_daily.title',
          'mood_member_daily.description',
          'mood_member_daily.feeling_level_id',
          'mood_member_daily.feeling_value',
          'mood_member_daily.count_like',
          'mood_member_daily.count_share',
          'mood_member_daily.count_comment',
          'mood_member_daily.location_latitude',
          'mood_member_daily.location_longitude',
          'mood_member_daily.location_value',
          'mood_member_daily.created',
          'mood_member_daily.modified',
          'member.id',
          'member.username',
          'member.avatar_name',
          'member.avatar_img',
          'member.avatar_path',
          'mood_feeling_level.id',
          'mood_feeling_level.name',
          'mood_feeling_level.value',
          'location_activity.id',
          'location_activity.name',
          'location_activity.value',
          'mood_like_history.id',
          'mood_like_history.value',
          // 'mood_comment_history.id',
          // 'mood_comment_history.description',
          'mood_member_follow.id',
          'mood_member_follow.member_id',
        ])
        .where(whereCondition)
        .orderBy('mood_member_daily.id', 'DESC')
        .skip(offset)
        .take(limit)
        .getMany()
    );
  }

  async getFeelingByMonth(
    currentMonthStart: Date,
    currentMonthEnd: Date,
    member_id: number,
    id: number,
  ): Promise<MoodMemberDaily[]> {
    const whereCondition = {
      is_deleted: false,
    };

    if (member_id !== 0) {
      whereCondition['member_id'] = member_id;
    }

    if (id !== 0) {
      whereCondition['id'] = id;
    }

    if (currentMonthStart !== null && currentMonthEnd !== null) {
      whereCondition['created'] = Between(currentMonthStart, currentMonthEnd);
    }

    return this.moodMemberDailyRepository
      .createQueryBuilder('mood_member_daily')
      .leftJoinAndSelect('mood_member_daily.member', 'member')
      .leftJoinAndSelect(
        'mood_member_daily.mood_feeling_level',
        'mood_feeling_level',
      )
      .leftJoinAndSelect(
        'mood_member_daily.location_activity',
        'location_activity',
      )
      .leftJoinAndSelect(
        'mood_member_daily.mood_like_history',
        'mood_like_history',
        'mood_like_history.created_by = :member_id',
        { member_id },
      )
      .leftJoinAndSelect(
        'mood_member_daily.mood_member_follow',
        'mood_member_follow',
        'mood_member_follow.member_id = :member_id',
        { member_id },
      )
      .select([
        'mood_member_daily.id',
        'mood_member_daily.title',
        'mood_member_daily.description',
        'mood_member_daily.feeling_level_id',
        'mood_member_daily.feeling_value',
        'mood_member_daily.count_like',
        'mood_member_daily.count_share',
        'mood_member_daily.count_comment',
        'mood_member_daily.location_latitude',
        'mood_member_daily.location_longitude',
        'mood_member_daily.location_value',
        'mood_member_daily.created',
        'mood_member_daily.modified',
        'member.id',
        'member.username',
        'member.avatar_name',
        'member.avatar_img',
        'member.avatar_path',
        'mood_feeling_level.id',
        'mood_feeling_level.name',
        'mood_feeling_level.value',
        'location_activity.id',
        'location_activity.name',
        'location_activity.value',
        'mood_like_history.id',
        'mood_like_history.value',
        'mood_member_follow.id',
        'mood_member_follow.member_id',
      ])
      .where(whereCondition)
      .orderBy('mood_member_daily.id', 'DESC')
      .getMany();
  }

  async getAllUserList(
    page: number,
    limit: number,
    user_id: number,
  ): Promise<MoodMemberDaily[]> {
    let offset = page * limit;
    offset = offset - limit;

    const whereCondition = {
      is_deleted: false,
      // member: {
      //   is_deleted: false,
      // },
    };

    if (user_id !== 0) {
      whereCondition['member_id'] = user_id;
    }

    return this.moodMemberDailyRepository.find({
      relations: [
        'member',
        'mood_feeling_level',
        'location_activity',
        'mood_like_history',
        'mood_comment_history',
      ],
      select: {
        id: true,
        title: true,
        description: true,
        feeling_level_id: true,
        feeling_value: true,
        count_like: true,
        count_share: true,
        count_comment: true,
        location_latitude: true,
        location_longitude: true,
        location_value: true,
        created: true,
        modified: true,
        member: {
          id: true,
          username: true,
          avatar_name: true,
          avatar_img: true,
          avatar_path: true,
        },
        mood_feeling_level: {
          id: true,
          name: true,
          value: true,
        },
        location_activity: {
          id: true,
          name: true,
          value: true,
        },
        mood_like_history: {
          id: true,
          value: true,
        },
        mood_comment_history: {
          id: true,
          description: true,
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

  async getMoodLevelByWeek(
    currentWeekStart: Date,
    currentWeekEnd: Date,
    user_id: number,
  ): Promise<MoodMemberDaily[]> {
    const mood_week = await this.moodMemberDailyRepository.find({
      relations: ['member', 'mood_feeling_level'],
      select: {
        id: true,
        created: true,
        mood_feeling_level: {
          name: true,
          value: true,
        },
        member: {
          id: false,
        },
      },
      where: {
        is_deleted: false,
        member_id: user_id,
        created: Between(currentWeekStart, currentWeekEnd),
      },
      order: {
        created: 'ASC',
      },
    });

    const moodWeekArray = [];
    let currentDate = currentWeekStart.getDate();
    const daysInWeek = 7;

    for (let a = 0; a < mood_week.length; a++) {
      const element = mood_week[a];
      if (currentDate <= element.created.getDate()) {
        for (let b = 0; b < 7; b++) {
          if (currentDate !== element.created.getDate()) {
            currentDate = currentDate + 1;
            moodWeekArray.push(null);
          }
        }
      }

      currentDate = element.created.getDate() + 1;
      moodWeekArray.push(element);

      if (a == mood_week.length - 1) {
        for (let c = 0; c < daysInWeek; c++) {
          if (moodWeekArray.length < daysInWeek) {
            currentDate = currentDate + 1;
            moodWeekArray.push(null);
          }
        }
      }
    }

    return moodWeekArray;
  }

  async getMoodLevelByMonth(
    currentMonthStart: Date,
    currentMonthEnd: Date,
    user_id: number,
  ): Promise<MoodMemberDaily[]> {
    const mood_month = await this.moodMemberDailyRepository.find({
      relations: ['member', 'mood_feeling_level'],
      select: {
        id: true,
        created: true,
        mood_feeling_level: {
          name: true,
          value: true,
        },
        member: {
          id: false,
        },
      },
      where: {
        is_deleted: false,
        member_id: user_id,
        created: Between(currentMonthStart, currentMonthEnd),
      },
      order: {
        created: 'ASC',
      },
    });

    const moodMonthArray = [];
    let currentDate = 1;

    const daysInMonth = new Date(
      currentMonthEnd.getFullYear(),
      currentMonthEnd.getMonth() + 1,
      0,
    ).getDate();

    for (let a = 0; a < mood_month.length; a++) {
      const element = mood_month[a];
      if (currentDate <= element.created.getDate()) {
        for (let b = 0; b < daysInMonth; b++) {
          if (currentDate !== element.created.getDate()) {
            currentDate = currentDate + 1;
            moodMonthArray.push(null);
          }
        }
      }

      currentDate = element.created.getDate() + 1;
      moodMonthArray.push(element);

      if (a == mood_month.length - 1) {
        for (let c = 0; c < daysInMonth; c++) {
          if (moodMonthArray.length < daysInMonth) {
            currentDate = currentDate + 1;
            moodMonthArray.push(null);
          }
        }
      }
    }

    return moodMonthArray;
  }

  async getMoodByWeek(
    currentWeekStart: Date,
    currentWeekEnd: Date,
    user_id: number,
    search: string,
  ): Promise<MoodMemberDaily[]> {
    let whereCondition = null;
    console.log('search', search);
    if (search === '' || search === undefined) {
      console.log('test', 1);
      whereCondition = [
        {
          is_deleted: false,
          member_id: user_id,
          created: Between(currentWeekStart, currentWeekEnd),
        },
      ];
    } else {
      console.log('test', 2);
      whereCondition = [
        {
          is_deleted: false,
          member_id: user_id,
          mood_feeling_level: { name: Like(`%${search}%`) },
          created: Between(currentWeekStart, currentWeekEnd),
        },
        {
          is_deleted: false,
          member_id: user_id,
          feeling_value: Like(`%${search}%`),
          created: Between(currentWeekStart, currentWeekEnd),
        },
        {
          is_deleted: false,
          member_id: user_id,
          location_value: Like(`%${search}%`),
          created: Between(currentWeekStart, currentWeekEnd),
        },
      ];
    }

    return this.moodMemberDailyRepository.find({
      relations: [
        'member',
        'mood_feeling_level',
        'location_activity',
        'mood_like_history',
        'mood_comment_history',
      ],
      select: {
        id: true,
        title: true,
        description: true,
        feeling_level_id: true,
        feeling_value: true,
        count_like: true,
        count_share: true,
        count_comment: true,
        location_latitude: true,
        location_longitude: true,
        location_value: true,
        created: true,
        modified: true,
        member: {
          id: true,
          username: true,
          avatar_name: true,
          avatar_img: true,
          avatar_path: true,
        },
        mood_feeling_level: {
          id: true,
          name: true,
          value: true,
        },
        location_activity: {
          id: true,
          name: true,
          value: true,
        },
        mood_like_history: {
          id: true,
          value: true,
        },
        mood_comment_history: {
          id: true,
          description: true,
        },
      },
      where: whereCondition,
      order: {
        id: 'DESC',
      },
    });
  }

  async getMoodById(mood_member_daily_id: number): Promise<MoodMemberDaily[]> {
    let whereCondition = null;
    whereCondition = [
      {
        id: mood_member_daily_id,
      },
    ];

    return this.moodMemberDailyRepository.find({
      relations: [
        'member',
        'mood_feeling_level',
        'location_activity',
        'mood_like_history',
        'mood_comment_history',
      ],
      select: {
        id: true,
        title: true,
        description: true,
        feeling_level_id: true,
        feeling_value: true,
        count_like: true,
        count_share: true,
        count_comment: true,
        location_latitude: true,
        location_longitude: true,
        location_value: true,
        created: true,
        modified: true,
        member: {
          id: true,
          username: true,
          avatar_name: true,
          avatar_img: true,
          avatar_path: true,
        },
        mood_feeling_level: {
          id: true,
          name: true,
          value: true,
        },
        location_activity: {
          id: true,
          name: true,
          value: true,
        },
        mood_like_history: {
          id: true,
          value: true,
        },
        mood_comment_history: {
          id: true,
          description: true,
        },
      },
      where: whereCondition,
      order: {
        id: 'DESC',
      },
    });
  }

  async activeMoodCountToDay(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    return this.moodMemberDailyRepository.count({
      where: {
        is_deleted: false,
        created: Between(today, tomorrow),
      },
    });
  }

  async getCountData(): Promise<number> {
    return this.moodMemberDailyRepository.count({
      where: {
        is_deleted: false,
      },
    });
  }

  async getCountDataByMemberId(member_id: number): Promise<number> {
    return this.moodMemberDailyRepository.count({
      where: {
        is_deleted: false,
        member_id: member_id,
      },
    });
  }

  async checkMyPostToDay(user_id: number): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Set time to the beginning of the next day

    return this.moodMemberDailyRepository.count({
      where: {
        is_deleted: false,
        created_by: user_id,
        created: Between(today, tomorrow),
      },
    });
  }

  async updateCommentCountById(id: number, count: number) {
    let moodMemberDaily = await this.moodMemberDailyRepository.findOneBy({
      id: id,
    });

    const dateTime = getTime();
    moodMemberDaily.count_comment = count;

    const toUpdate = await this.moodMemberDailyRepository.save(moodMemberDaily);

    return toUpdate;
  }
}
