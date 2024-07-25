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
import { CommunityType } from 'src/community_types/entities/community_type.entity';
import { CommunityPhoto } from 'src/community_photos/entities/community_photo.entity';
import { CommunityCommentHistory } from 'src/community_comment_histories/entities/community_comment_history.entity';

@Entity({ schema: 'public', name: 'community_feeds' })
export class CommunityFeed {
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

  @Column({ name: 'community_type_id', type: 'bigint', nullable: true })
  community_type_id: number;

  @Column({ name: 'topic', type: 'varchar', length: 100 })
  topic: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'is_share', type: 'boolean', default: false })
  is_share: boolean;

  @Column({ name: 'is_comment', type: 'boolean', default: false })
  is_comment: boolean;

  @Column({ name: 'is_like', type: 'boolean', default: false })
  is_like: boolean;

  @ManyToOne(() => Members, (Member) => Member.id)
  @JoinColumn({ name: 'created_by' })
  member: Members;

  @ManyToOne(() => CommunityType, (CommunityType) => CommunityType.id)
  @JoinColumn({ name: 'community_type_id' })
  community_type: CommunityType;

  @OneToMany(() => CommunityPhoto, (CommunityPhoto) => CommunityPhoto.community_feed)
  community_photo: CommunityPhoto;

  @OneToMany(() => CommunityCommentHistory, (CommunityCommentHistory) => CommunityCommentHistory.community_feed)
  community_comment_history: CommunityCommentHistory;
}
