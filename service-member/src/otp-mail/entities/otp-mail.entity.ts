import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'service' })
export class OtpMail {

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
  ref_code:string;

  @Column()
  otp:number;

  @Column()
  expire_time:Date;

  @Column()
  email:string;
}
