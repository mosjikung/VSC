import { Districts } from 'src/districts/entities/district.entity';
import { Provinces } from 'src/provinces/entities/province.entity';
import { Subdistricts } from 'src/subdistricts/entities/subdistrict.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity({ schema:'system',name: 'member_addresses' })
export class MemberAddress {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created: Date;

  @Column({ type: 'bigint', nullable: true })
  created_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  modified: Date;

  @Column({ type: 'bigint', nullable: true })
  modified_by: number;

  @Column({ type: 'timestamp', nullable: true })
  deleted: Date;

  @Column({ type: 'bigint', nullable: true })
  deleted_by: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({ type: 'bigint', nullable: true })
  member_id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column()
  province_id:number;

  @Column()
  district_id:number;

  @Column()
  subdistrict_id:number;

  // @ManyToOne(() => Subdistricts, { nullable: true })
  // @JoinColumn({ name: 'subdistrict_id' })
  // subdistrict: Subdistricts;

  // @ManyToOne(() => Districts, { nullable: true })
  // @JoinColumn({ name: 'district_id' })
  // district: Districts;

  // @ManyToOne(() => Provinces, { nullable: true })
  // @JoinColumn({ name: 'province_id' })
  // province: Provinces;

  @Column({ type: 'varchar', length: 10, nullable: true })
  zip_code: string;
}
