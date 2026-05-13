import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Business } from './businesses.entity';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private readonly businessRepository: Repository<Business>,
  ) {}

  findAll() {
    return this.businessRepository.find();
  }

  findOne(id: number) {
    return this.businessRepository.findOneBy({ id });
  }

  create(createBusinessDto: CreateBusinessDto  ) {
    const business = this.businessRepository.create(createBusinessDto);
    return this.businessRepository.save(business);
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