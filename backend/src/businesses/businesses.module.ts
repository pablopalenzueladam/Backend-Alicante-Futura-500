import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './business.entity';
import { Service } from 'src/services/service.entity';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Business, Service])],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}