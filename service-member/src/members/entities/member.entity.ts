
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { getTime } from "src/utility/utility";

@Entity({ schema: 'system', name: 'members' })
export class Members {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  username: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 520, nullable: true })
  avatar_name: string;

  @Column({ type: 'text', nullable: true })
  avatar_img: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  avatar_path: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  code: string;

  @Column({ type: 'bigint', nullable: true })
  citizen_id: number;

  @Column({ type: 'varchar', length: 520, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 520, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  remark: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  email_verify: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  unique_link: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expire_time: Date;

  @Column({ type: 'varchar', length: 128, nullable: true })
  unique_link_activated: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expire_time_activated: Date;

  @Column({ type: 'boolean', default: false })
  is_activated: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true })
  lasted_login: Date;

  @Column({ type: 'varchar', length: 6, nullable: true })
  otp_member: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  otp_member_expire_time: Date;

  @Column({ type: 'bigint', nullable: true })
  role_id: number;

  @Column({ type: 'bigint', nullable: true })
  member_objective_id: number;

  @Column({ type: 'varchar', length: 40, nullable: true })
  session_id: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp with time zone' })
  created: Date;

  @Column({ type: 'bigint', nullable: true })
  created_by: number;

  @Column({ type: 'timestamp with time zone' })
  modified: Date;

  @Column({ type: 'bigint', nullable: true })
  modified_by: number;

  @Column({ type: 'timestamp with time zone' })
  deleted: Date;

  @Column({ type: 'bigint', nullable: true })
  deleted_by: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;
  
  @Column({ type:'date'})
  birthday:Date;
}