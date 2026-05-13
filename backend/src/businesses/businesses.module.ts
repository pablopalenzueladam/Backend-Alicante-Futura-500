import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business } from './businesses.entity';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}