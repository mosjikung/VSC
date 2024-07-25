import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { Members } from 'src/members/entities/member.entity';
import { CommunityFeed } from 'src/community_feeds/entities/community_feed.entity';

@Entity({ schema: 'public', name: 'community_like_histories' })
export class CommunityLikeHistory {
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

  @Column({ name: 'community_feed_id', type: 'bigint', nullable: true })
  community_feed_id: number;

  @Column({ type: 'smallint', nullable: true })
  value: number;

  @ManyToOne(() => Members, (Member) => Member.id)
  @JoinColumn({ name: 'created_by' })
  member: Members;

  @ManyToOne(() => CommunityFeed, (CommunityFeed) => CommunityFeed.id)
  @JoinColumn({ name: 'community_feed_id' })
  community_feed: CommunityFeed;
}
