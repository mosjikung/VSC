import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_feeling_values' })
export class MoodFeelingValue {
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

    @Column({ name: 'name', type: 'varchar', length: 50, collation: 'pg_catalog.default' })
    name: string;

    @Column({ name: 'value', type: 'integer', nullable: true })
    value: number;
}
