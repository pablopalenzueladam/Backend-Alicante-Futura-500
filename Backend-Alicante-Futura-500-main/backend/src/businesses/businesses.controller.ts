import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessesService } from './businesses.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Listado de negocios' })
  findAll() {
    return this.businessesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Detalle de un comercio' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.businessesService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Comercio creado' })
  create(@Body() CreateBusinessDto: CreateBusinessDto) {
    return this.businessesService.create(CreateBusinessDto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Comercio actualizado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessesService.update(id, UpdateBusinessDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Comercio eliminado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.businessesService.remove(id);
  }
}