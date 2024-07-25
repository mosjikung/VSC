import { ApiProperty } from '@nestjs/swagger';
import { MoodMemberDaily } from 'src/mood_member_dailies/entities/mood_member_daily.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ schema: 'public', name: 'mood_member_follows' })
export class MoodMemberFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created' })
  created: Date;

  @Column({ name: 'created_by' })
  created_by: number;

  @Column({ name: 'modified' })
  modified: Date;

  @Column({ name: 'modified_by' })
  modified_by: number;

  @Column({ name: 'deleted' })
  deleted: Date;

  @Column({ name: 'deleted_by' })
  deleted_by: number;

  @Column({ name: 'is_deleted', default: false })
  is_deleted: boolean;

  @ApiProperty()
  @Column({ name: 'member_id' })
  member_id: number;

  @ManyToOne(
    () => MoodMemberDaily,
    (moodMemberDaily) => moodMemberDaily.mood_member_follow,
  )
  @JoinColumn({ name: 'member_id', referencedColumnName: 'created_by' })
  mood_member_daily: MoodMemberDaily;
}
