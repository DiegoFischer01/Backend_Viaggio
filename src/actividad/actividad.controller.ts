import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActividadService } from './actividad.service';
import { CreateActividadDto } from './dto/create-actividad.dto';
import { UpdateActividadDto } from './dto/update-actividad.dto';
import { Actividad } from './entities/actividad.entity';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  async create(
    @Body() createActividadDto: CreateActividadDto,
  ): Promise<Actividad> {
    return this.actividadService.create(createActividadDto);
  }

  @Get()
  async findAll(): Promise<Actividad[]> {
    return this.actividadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Actividad> {
    return this.actividadService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActividadDto: UpdateActividadDto,
  ): Promise<Actividad> {
    return this.actividadService.update(+id, updateActividadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Actividad> {
    return this.actividadService.remove(+id);
  }
}
