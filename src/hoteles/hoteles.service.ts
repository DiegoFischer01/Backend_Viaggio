import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hoteles.entitys';
import { CreateHotelDto } from './dto/create-hoteles.dto';
import { UpdateHotelDto } from './dto/update-hoteles.dto';

@Injectable()
export class HotelesService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,
  ) {}

  // Listar todos los hoteles
  findAll(): Promise<Hotel[]> {
    return this.hotelRepo.find();
  }

  // Obtener un hotel por id
  async findOne(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepo.findOneBy({ id });
    if (!hotel) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    return hotel;
  }

  // Crear un hotel
  create(dto: CreateHotelDto): Promise<Hotel> {
    const hotel = this.hotelRepo.create(dto);
    return this.hotelRepo.save(hotel);
  }

  // Actualizar un hotel
  async update(id: number, dto: UpdateHotelDto): Promise<Hotel> {
    await this.hotelRepo.update(id, dto);
    return this.findOne(id);
  }

  // Eliminar un hotel
  async remove(id: number): Promise<void> {
    const hotel = await this.findOne(id);
    await this.hotelRepo.remove(hotel);
  }
}
