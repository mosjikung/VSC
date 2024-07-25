import { MoodMemberDaily } from 'src/mood_member_dailies/entities/mood_member_daily.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ schema: 'public', name: 'mood_location_activities' })
export class MoodLocationActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created', type: 'timestamp', precision: 6 })
  created: Date;

  @Column({ name: 'created_by' })
  created_by: number;

  @Column({ name: 'modified', type: 'timestamp', precision: 6 })
  modified: Date;

  @Column({ name: 'modified_by' })
  modified_by: number;

  @Column({ name: 'deleted', type: 'timestamp', precision: 6 })
  deleted: Date;

  @Column({ name: 'deleted_by' })
  deleted_by: number;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ name: 'name', length: 50, collation: 'pg_catalog.default' })
  name: string;

  @Column({ name: 'value', type: 'integer' })
  value: number;
  
  @OneToMany(() => MoodMemberDaily, (MoodMemberDaily) => MoodMemberDaily.location_activity)
  mood_member_daily: MoodMemberDaily;
}
