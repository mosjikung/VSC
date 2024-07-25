import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({schema:'master'})
export class Languages {
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
  name:string;

  @Column()
  full_name:string;

  @Column()
  icon_file_name:string;

  @Column()
  icon_file_path:string;
  
  @Column()
  icon_file_type:string;

  @Column()
  icon_file_size:string;

  @Column()
  object_key:string;


}
