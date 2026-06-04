import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
  ) {}

  findAll() {
    return this.servicesRepository.find({
    });
  }

  findOne(id: number) {
    return this.servicesRepository.findOneBy({ id });
  }

  create(createServiceDto: CreateServiceDto) {
    const service = this.servicesRepository.create(createServiceDto);
    return this.servicesRepository.save(service);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.servicesRepository.findOneBy({ id });

    if (!service) {
      throw new NotFoundException(`No existe la reserva con id ${id}`);
    }

    const updatedservice = this.servicesRepository.merge(
      service,
      updateServiceDto,
    );

    return this.servicesRepository.save(updatedservice);
  }

  async remove(id: number) {
    const service = await this.servicesRepository.findOneBy({ id });

    if (!service) {
      throw new NotFoundException(`No existe el servicio con id ${id}`);
    }

    await this.servicesRepository.remove(service);

    return { message: `Servicio ${id} eliminado correctamente` };
  }
}