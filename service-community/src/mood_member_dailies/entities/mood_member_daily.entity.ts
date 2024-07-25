import { Members } from 'src/members/entities/member.entity';
import { MoodCommentHistory } from 'src/mood_comment_histories/entities/mood_comment_history.entity';
import { MoodFeelingLevel } from 'src/mood_feeling_levels/entities/mood_feeling_level.entity';
import { MoodLikeHistory } from 'src/mood_like_histories/entities/mood_like_history.entity';
import { MoodLocationActivity } from 'src/mood_location_activities/entities/mood_location_activity.entity';
import { MoodMemberFollow } from 'src/mood_member_follows/entities/mood_member_follow.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_member_dailies' })
export class MoodMemberDaily {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', precision: 6, nullable: true })
    created: Date;

    @Column({ name: 'created_by', type: 'bigint', nullable: true })
    created_by: number;

    @Column({ type: 'timestamp', precision: 6, nullable: true })
    modified: Date;

    @Column({ name: 'modified_by', type: 'bigint', nullable: true })
    modified_by: number;

    @Column({ type: 'timestamp', precision: 6, nullable: true })
    deleted: Date;

    @Column({ name: 'deleted_by', type: 'bigint', nullable: true })
    deleted_by: number;

    @Column({ name: 'is_deleted', type: 'boolean', default: false })
    is_deleted: boolean;

    @Column({ name: 'member_id', type: 'bigint', nullable: true })
    member_id: number;

    @Column({ type: 'varchar', length: 100, collation: 'pg_catalog.default', nullable: true })
    title: string;

    @Column({ type: 'text', collation: 'pg_catalog.default', nullable: true })
    description: string;

    @Column({ name: 'feeling_level_id', type: 'bigint', nullable: true })
    feeling_level_id: number;

    @Column({ name: 'feeling_value', type: 'varchar', length: 100, collation: 'pg_catalog.default', nullable: true })
    feeling_value: string;

    @Column({ name: 'count_like', type: 'integer', nullable: true })
    count_like: number;

    @Column({ name: 'count_share', type: 'integer', nullable: true })
    count_share: number;

    @Column({ name: 'count_comment', type: 'integer', nullable: true })
    count_comment: number;

    @Column({ name: 'location_activity_id', type: 'bigint', nullable: true })
    location_activity_id: number;

    @Column({ name: 'location_latitude', type: 'varchar', length: 20, collation: 'pg_catalog.default', nullable: true })
    location_latitude: string;

    @Column({ name: 'location_longitude', type: 'varchar', length: 20, collation: 'pg_catalog.default', nullable: true })
    location_longitude: string;

    @Column({ name: 'location_value', type: 'varchar', length: 100, collation: 'pg_catalog.default', nullable: true })
    location_value: string;

    @ManyToOne(() => Members, (Member) => Member.mood_member_daily)
    @JoinColumn({ name: 'member_id' })
    member: Members;
  
    @ManyToOne(() => MoodFeelingLevel, (MoodFeelingLevel) => MoodFeelingLevel.mood_member_daily)
    @JoinColumn({ name: 'feeling_level_id' })
    mood_feeling_level: MoodFeelingLevel;
  
    @ManyToOne(() => MoodLocationActivity, (MoodLocationActivity) => MoodLocationActivity.mood_member_daily)
    @JoinColumn({ name: 'location_activity_id' })
    location_activity: MoodLocationActivity;
  
    @OneToMany(() => MoodLikeHistory, (MoodLikeHistory) => MoodLikeHistory.mood_member_daily)
    mood_like_history: MoodLikeHistory;
  
    @OneToMany(() => MoodCommentHistory, (MoodCommentHistory) => MoodCommentHistory.mood_member_daily)
    mood_comment_history: MoodCommentHistory;
  
    @OneToMany(() => MoodMemberFollow, (MoodMemberFollow) => MoodMemberFollow.mood_member_daily)
    mood_member_follow: MoodMemberFollow;
}
