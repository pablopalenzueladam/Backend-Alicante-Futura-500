import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { Service } from '../services/service.entity';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  findAll() {
  return this.businessRepository.find({ relations: ['services'] });
}

  findOne(id: number) {
    return this.businessRepository.findOne({
      where: { id },
      relations: ['services'],
    });
  }

  async create(createBusinessDto: CreateBusinessDto) {
    const { services, ...businessData } = createBusinessDto;

    const business = this.businessRepository.create(businessData);
    const savedBusiness = await this.businessRepository.save(business);

    if(services?.length) {
      await this.serviceRepository.save(
        services.map((s) => ({
          ...s,
          business: savedBusiness,
        }))
      );
    }

    return this.businessRepository.findOne({
      where: {id: savedBusiness.id},
      relations: ['services'],
    })
}

  async update(id: number, updateBusinessDto: UpdateBusinessDto) {
    const business = await this.businessRepository.findOneBy({ id });

    if (!business) {
      throw new NotFoundException(`No existe el negocio con id ${id}`);
    }

    const updatedBusiness = this.businessRepository.merge(
      business,
      updateBusinessDto,
    );

    return this.businessRepository.save(updatedBusiness);
  }

  async remove(id: number) {
    const business = await this.businessRepository.findOneBy({ id });

    if (!business) {
      throw new NotFoundException(`No existe el negocio con id ${id}`);
    }

    await this.businessRepository.remove(business);

    return { message: `Negocio ${id} eliminado correctamente` };
  }
}