import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer, CustomerRole } from './customer.entity';
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

  async create(createCustomerDto: CreateCustomerDto) {
    // Verificar que no existe ya un cliente con ese email
    const existing = await this.customersRepository.findOne({
      where: { email: createCustomerDto.email },
    });
    if (existing) {
      throw new ConflictException(`Ya existe un usuario con el email "${createCustomerDto.email}"`);
    }

    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 10);

    const customer = this.customersRepository.create({
      ...createCustomerDto,
      password: hashedPassword,
    });
    return this.customersRepository.save(customer);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customersRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException(`No existe el cliente con id ${id}`);
    }

    // Si el DTO incluye una contraseña nueva, hashearla antes de guardar.
    // Sin este paso, update() sobreescribe la contraseña en texto plano,
    // rompiendo el login de ese usuario permanentemente.
    if (updateCustomerDto.password) {
      updateCustomerDto = {
        ...updateCustomerDto,
        password: await bcrypt.hash(updateCustomerDto.password, 10),
      };
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

    const rawCustomers = await this.customersRepository
      .createQueryBuilder('customer')
      .leftJoin('customer.appointments', 'appointment', 'appointment.date > :now', {now})
      .select([
      'customer.id AS id',
      'customer.name AS name',
      'customer.email AS email',
      'customer.phone AS phone',
      'customer.businessId AS businessId'
    ])
    .addSelect('MIN(appointment.date)', 'nextAppointment')
    .groupBy('customer.id')
    .getRawMany();

    return rawCustomers;
  }

  async updateRole(id: number, newRole: CustomerRole) {
    const customer = await this.customersRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException('No se encontró ningún usuario con el ID ${id}');
    }

    await this.customersRepository.update(id, { role: newRole });

    return {
      message: 'El rol del usuario con ID ${id} ha sido actualizado a [${newRole}] con éxito.',
    }
  }
}
