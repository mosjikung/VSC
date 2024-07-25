import { Provinces } from "src/provinces/entities/province.entity";
//import { Subdistricts } from "src/subdistricts/entities/subdistrict.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema:'master'})
export class Districts {
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
  country_id:number;

  @Column()
  province_id:number;

  @Column()
  is_active:boolean;


//   @ManyToOne(() => Provinces, (province) => province.districts)
//   @JoinColumn({ name: 'province_id' })  // กำหนดชื่อคอลัมน์สำหรับ Foreign Key
//   province: Provinces;

//   @OneToMany(() => Subdistricts, (subdistrict) => subdistrict.district)
//   subdistricts: Subdistricts[];
 }
