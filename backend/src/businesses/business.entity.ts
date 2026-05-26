import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { Service } from '../services/service.entity';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  zipcode!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true})
  maxCustomers!: number;

  @OneToMany(() => Appointment, (appointment) => appointment.businessId)
  appointments!: Appointment[];

  @OneToMany(() => Service, (service) => service.businessId)
  services!: Service[];
} 