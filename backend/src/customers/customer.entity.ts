import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true, unique: true })
  phone!: string;

  @Column({ nullable: true })
  businessId!: number;

  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments!: Appointment[];
} 