import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
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

  @Column({nullable: true})
  durationMinutes!: number;

  @Column( {nullable: true })
  businessId!: number;

  @ManyToOne(() => Business, (business) => business.services, {onDelete: 'CASCADE'})
  @JoinColumn( {name: 'businessId' })
  business!: Business;
  
  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments!: Appointment[];
  

} 