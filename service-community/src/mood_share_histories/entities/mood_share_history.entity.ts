import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_share_histories' })
export class MoodShareHistory {
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

    @Column({ type: 'varchar', length: 255, collation: 'pg_catalog.default', nullable: true })
    channel: string;
}
