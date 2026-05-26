import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { GetNextAppointment } from './dto/get-next-appointment';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  findAll() {
    return this.customersRepository.find();
  }

  findOne(id: number) {
    return this.customersRepository.findOneBy({ id });
  }

  // Aquí la función de crear cliente, que hashea la contraseña que se introduzca
  async create(createCustomerDto: CreateCustomerDto) {
    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);

    const customer = this.customersRepository.create({... createCustomerDto, password: hashedPassword,});
    return this.customersRepository.save(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customersRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`No existe el cliente con id ${id}`);
    }

    const updatedCustomer = this.customersRepository.merge(
      customer,
      updateCustomerDto,
    );

    return this.customersRepository.save(updatedCustomer);
  }

  async remove(id: number) {
    const customer = await this.customersRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`No existe el cliente con id ${id}`);
    }

    await this.customersRepository.remove(customer);

    return { message: `Cliente ${id} eliminado correctamente` };
  }

  async getNextAppointment() {
    const now = new Date();

    const customers = await this.customersRepository
      .createQueryBuilder("customer")
      .leftJoin("customer.appointment", "appointment")
      .addSelect("MIN(appointment.date)", "nextAppointment")
      .where("appointment.date > :now", { now })
      .groupBy("customer.id")
      .getRawMany();

    return customers;
  }
  
}