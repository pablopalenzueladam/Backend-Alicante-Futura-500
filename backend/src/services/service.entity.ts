import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { Business } from '../businesses/business.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  durationMinutes!: number;

  @Column()
  businessId!: number;

  @ManyToOne(() => Business, (business) => business.id)
  business!: Business;
  
  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments!: Appointment[];
  

} 