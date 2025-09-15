import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
  ) {}

  public async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find();
  }

  public async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { idReserva: id },
    });
    if (!reserva) {
      throw new NotFoundException(`La reserva con id ${id} no se encuentra`);
    }
    return reserva;
  }

  public async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const reserva = this.reservaRepository.create(createReservaDto);
    return this.reservaRepository.save(reserva);
  }

  public async update(
    id: number,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    const reserva = await this.reservaRepository.preload({
      idReserva: id,
      ...updateReservaDto,
    });

    if (!reserva)
      throw new NotFoundException(`No se encuentra la reserva con id ${id}`);

    return this.reservaRepository.save(reserva);
  }

  public async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.reservaRepository.delete(id);
  }
}
