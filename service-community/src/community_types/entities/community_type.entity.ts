import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { CommunityFeed } from 'src/community_feeds/entities/community_feed.entity';

@Entity({ schema: 'public', name: 'community_types' })
export class CommunityType {

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

  @OneToMany(() => CommunityFeed, (CommunityFeed) => CommunityFeed.community_type_id)
  community_type: CommunityFeed;
}
