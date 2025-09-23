import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const fechaLlegadaDate = new Date(createReservaDto.fechaLlegada);
    const fechaRegresoDate = createReservaDto.fechaRegreso
      ? new Date(createReservaDto.fechaRegreso)
      : null;

    if (fechaRegresoDate && fechaRegresoDate <= fechaLlegadaDate) {
      throw new BadRequestException(
        'La fecha de regreso debe ser posterior a la fecha de llegada',
      );
    }

    const reservaEntity = this.reservaRepository.create(createReservaDto);

    return this.reservaRepository.save(reservaEntity);
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

  public async remove(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);

    return await this.reservaRepository.remove(reserva);
  }
}
