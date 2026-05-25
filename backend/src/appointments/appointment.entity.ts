import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Customer } from '../customers/customers.entity';
import { Service } from '../services/services.entity';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column()
  time!: string;

  @Column({
    type: 'text',
    default: AppointmentStatus.PENDING,
  })
  status!: AppointmentStatus;

  @Column()
  customerId!: number;

  @OneToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @Column()
  businessId!: number;

  @Column()
  serviceName!: string;

  @ManyToOne(() => Service, (service) => service.name)
  @JoinColumn({ name: 'serviceId' })
  service!: Service;

  
} 