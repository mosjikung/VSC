export class Province {}
//import { Districts } from "src/districts/entities/district.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({schema:'master'})
export class Provinces {
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
  zone_id:number;

  // @OneToMany(() => Districts, (district) => district.province)
  // districts: Districts[];
  
}
