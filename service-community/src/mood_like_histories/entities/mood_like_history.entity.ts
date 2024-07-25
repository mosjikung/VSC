import { MoodMemberDaily } from 'src/mood_member_dailies/entities/mood_member_daily.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_like_histories' })
export class MoodLikeHistory {
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

    @Column({ name: 'mood_member_daily_id' })
    mood_member_daily_id: number;

    @Column({ name: 'value' })
    value: number;

    @ManyToOne(() => MoodMemberDaily, (MoodMemberDaily) => MoodMemberDaily.mood_feeling_level)
    @JoinColumn({ name: 'mood_member_daily_id' })
    mood_member_daily: MoodMemberDaily;
}
