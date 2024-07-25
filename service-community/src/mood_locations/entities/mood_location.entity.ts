import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_locations' })
export class MoodLocation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', precision: 6, nullable: true })
    created: Date;

    @Column({ name: 'created_by', nullable: true })
    created_by: number;

    @Column({ type: 'timestamp', precision: 6, nullable: true })
    modified: Date;

    @Column({ name: 'modified_by', nullable: true })
    modified_by: number;

    @Column({ type: 'timestamp', precision: 6, nullable: true })
    deleted: Date;

    @Column({ name: 'deleted_by', nullable: true })
    deleted_by: number;

    @Column({ type: 'boolean', default: false })
    is_deleted: boolean;

    @Column({ length: 255, collation: 'pg_catalog.default' })
    name: string;

    @Column({ type: 'text', collation: 'pg_catalog.default', nullable: true })
    description: string;

    @Column({ name: 'location_latitude', length: 20, collation: 'pg_catalog.default' })
    location_latitude: string;

    @Column({ name: 'location_longitude', length: 20, collation: 'pg_catalog.default' })
    location_longitude: string;
}
