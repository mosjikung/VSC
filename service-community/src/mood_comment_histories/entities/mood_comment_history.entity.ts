import { MoodMemberDaily } from 'src/mood_member_dailies/entities/mood_member_daily.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_comment_histories' })
export class MoodCommentHistory {
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

    @Column({ name: 'mood_member_daily_id', type: 'bigint', nullable: true })
    mood_member_daily_id: number;

    @Column({ type: 'text', collation: 'pg_catalog.default', nullable: true })
    description: string;

    @ManyToOne(() => MoodMemberDaily, (MoodMemberDaily) => MoodMemberDaily.mood_comment_history)
    @JoinColumn({ name: 'mood_member_daily_id' })
    mood_member_daily: MoodMemberDaily;
}
