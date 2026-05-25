import { Column, Entity, OneToMany, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { Business } from '../businesses/businesses.entity'

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

  @OneToOne(() => Business, (business) => business.id)
  @JoinColumn({ name: 'businessId' })
  business!: Business;
  
  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments!: Appointment[];
  

} 