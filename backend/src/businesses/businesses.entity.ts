import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ })
  phone!: string;

  @Column({ nullable: true })
  service: string;

  @Column({ nullable: true })
  price: number;

  @OneToMany(() => Appointment, (appointment) => appointment.businessId)
  appointments!: Appointment[];
} 