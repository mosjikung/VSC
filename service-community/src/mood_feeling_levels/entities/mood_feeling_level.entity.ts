import { MoodMemberDaily } from 'src/mood_member_dailies/entities/mood_member_daily.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_feeling_levels' })
export class MoodFeelingLevel {
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

    @Column({ type: 'varchar', length: 50, collation: 'pg_catalog.default' })
    name: string;

    @Column({ type: 'integer', nullable: true })
    value: number;

    @OneToMany(() => MoodMemberDaily, (MoodMemberDaily) => MoodMemberDaily.mood_feeling_level)
    mood_member_daily: MoodMemberDaily;
}
