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

  // 🟢 Crear una nueva actividad
  async create(createActividadDto: CreateActividadDto): Promise<Actividad> {
    const nuevaActividad = this.actividadRepository.create(createActividadDto);
    return await this.actividadRepository.save(nuevaActividad);
  }

  // 🔍 Obtener todas las actividades
  async findAll(): Promise<Actividad[]> {
    return await this.actividadRepository.find();
  }

  // 🔍 Obtener una actividad por ID — ESTE ES EL MÉTODO QUE PREGUNTÁS
async findOne(id: number): Promise<Actividad> {
  const actividad = await this.actividadRepository.findOne({
    where: { id },
  });

  if (!actividad) {
    throw new NotFoundException(`Actividad con ID ${id} no encontrada`);
  }

  return actividad;
}

  // ✏️ Actualizar una actividad
  async update(id: number, updateActividadDto: Partial<CreateActividadDto>): Promise<Actividad> {
    await this.actividadRepository.update(id, updateActividadDto);
    return await this.findOne(id); // Ya lanza NotFoundException si no existe
  }

  // 🗑️ Eliminar una actividad
  async remove(id: number): Promise<void> {
    await this.actividadRepository.delete(id);
  }
}