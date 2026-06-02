import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

export enum CustomerRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true, unique: true })
  phone!: string;

  @Column({ nullable: true })
  businessId!: number;

  @Column()
  password!: string;

  @Column({
    type: 'text',
    enum: CustomerRole,
    default: CustomerRole.USER,
    })
  status!: CustomerRole;

  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments!: Appointment[];

  
} 