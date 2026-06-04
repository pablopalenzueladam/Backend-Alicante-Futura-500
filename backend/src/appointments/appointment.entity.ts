import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { Service } from '../services/service.entity';

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

  @ManyToOne(() => Customer, (customer) => customer.appointments)
  customer!: Customer;

  @Column()
  businessId!: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null
  })
  serviceName?: string;

  @ManyToOne(() => Service, (service) => service.appointments)
  @JoinColumn({ name: 'serviceId' })
  service!: Service;


}