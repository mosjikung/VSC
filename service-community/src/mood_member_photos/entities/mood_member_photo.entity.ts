import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_member_photos' })
export class MoodMemberPhoto {
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

    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @Column({ name: 'community_feed_id', type: 'bigint', nullable: true })
    community_feed_id: number;

    @Column({ name: 'file_name', type: 'varchar', length: 255, collation: 'pg_catalog.default' })
    file_name: string;

    @Column({ name: 'file_path', type: 'text', collation: 'pg_catalog.default' })
    file_path: string;

    @Column({ name: 'file_type', type: 'text', collation: 'pg_catalog.default' })
    file_type: string;

    @Column({ name: 'file_size', type: 'text', collation: 'pg_catalog.default' })
    file_size: string;

    @Column({ name: 'object_key', type: 'varchar', length: 255, collation: 'pg_catalog.default' })
    object_key: string;
}
