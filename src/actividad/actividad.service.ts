import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { CreateActividadDto } from './dto/create-actividad.dto';

@Injectable()
export class ActividadService {
  constructor(
    @InjectRepository(Actividad)
    private readonly actividadRepository: Repository<Actividad>,
  ) {}

  async create(createActividadDto: CreateActividadDto): Promise<Actividad> {
  try {
    const nuevaActividad = this.actividadRepository.create(createActividadDto);
    return await this.actividadRepository.save(nuevaActividad);
  } catch (error) {
    console.error('Error al crear actividad:', error);
    throw error;
  }
}

  // Obtener todas las actividades
  async findAll(): Promise<Actividad[]> {
    return await this.actividadRepository.find();
  }

  //  Obtener una actividad por ID 
async findOne(id: number): Promise<Actividad> {
  const actividad = await this.actividadRepository.findOne({
    where: { id },
  });

  if (!actividad) {
    throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
  }

  return actividad;
}

  // Actualizar una actividad
  async update(id: number, updateActividadDto: Partial<CreateActividadDto>): Promise<Actividad> {
    await this.actividadRepository.update(id, updateActividadDto);
    return await this.findOne(id); // Ya lanza NotFoundException si no existe
  }

  // Eliminar una actividad
  async remove(id: number): Promise<void> {
  const result = await this.actividadRepository.delete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
  }
}
}