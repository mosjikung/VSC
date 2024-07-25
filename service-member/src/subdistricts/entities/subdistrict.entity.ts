//import { Districts } from "src/districts/entities/district.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema:'master'})
export class Subdistricts {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  is_deleted:boolean;

  @Column()
  modified:Date;

  @Column()
  modified_by:number;

  @Column()
  created:Date;

  @Column()
  created_by:number;

  @Column()
  deleted:Date;

  @Column()
  deleted_by:number;

  @Column()
  code:string;

  @Column()
  name:string;

  @Column()
  description:string;

  @Column()
  zipcode:string;

  @Column()
  country_id:number;

  @Column()
  province_id:number;
  
  @Column()
  district_id:number;

  @Column()
  is_active:boolean;

  // @ManyToOne(() => Districts, (district) => district.subdistricts)
  // @JoinColumn({ name: 'district_id' })  // กำหนดชื่อคอลัมน์สำหรับ Foreign Key
  // district: Districts;


}
