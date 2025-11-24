import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { In, Repository } from 'typeorm';
import { Hotel } from 'src/hoteles/entities/hoteles.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Actividad } from 'src/actividad/entities/actividad.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,

    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Actividad)
    private actividadRepository: Repository<Actividad>,
  ) {}

  public async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find({
      relations: ['usuario', 'hotel', 'actividades'],
    });
  }

  public async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { idReserva: id },
      relations: ['usuario', 'hotel', 'actividades'],
    });
    if (!reserva) {
      throw new NotFoundException(`La reserva con id ${id} no se encuentra`);
    }
    return reserva;
  }

  public async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    const { hotelId, usuarioId, actividadIds, ciudad, fechaLlegada, fechaRegreso } = createReservaDto;

    // Validar fechas
    const fechaLlegadaDate = new Date(fechaLlegada);
    const fechaRegresoDate = fechaRegreso ? new Date(fechaRegreso) : undefined;
    if (fechaRegresoDate && fechaRegresoDate <= fechaLlegadaDate) {
      throw new BadRequestException('La fecha de regreso debe ser posterior a la fecha de llegada');
    }

    // Validar hotel
    const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
    if (!hotel) throw new NotFoundException(`No se encuentra el Hotel con id: ${hotelId}`);

    // Validar usuario
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) throw new NotFoundException(`No se encuentra el Usuario con id ${usuarioId}`);

    // Validar actividades
    const actividades =
      actividadIds && actividadIds.length > 0
        ? await this.actividadRepository.findBy({ id: In(actividadIds) })
        : [];

    if (actividadIds && actividades.length !== actividadIds.length) {
      throw new NotFoundException(`Una o mas actividades no fueron encontradas`);
    }

    // Crear entidad
    const reserva = this.reservaRepository.create({
      ciudad,
      fechaLlegada: fechaLlegadaDate,
      fechaRegreso: fechaRegresoDate,
      hotel,
      usuario,
      actividades,
    });

    // Guardar en DB
    const savedReserva: Reserva = await this.reservaRepository.save(reserva);
    return savedReserva;
  }

  public async update(idReserva: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const { hotelId, usuarioId, actividadIds, ...updateData } = updateReservaDto;

    const reserva = await this.reservaRepository.findOne({
      where: { idReserva },
      relations: ['hotel', 'usuario', 'actividades'],
    });
    if (!reserva) throw new NotFoundException(`No se encontro la Reserva con el id: ${idReserva}`);

    Object.assign(reserva, updateData);

    if (hotelId !== undefined) {
      const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
      if (!hotel) throw new NotFoundException(`Hotel with id ${hotelId} not found`);
      reserva.hotel = hotel;
    }

    if (usuarioId !== undefined) {
      const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
      if (!usuario) throw new NotFoundException(`Usuario with id ${usuarioId} not found`);
      reserva.usuario = usuario;
    }

    if (actividadIds !== undefined) {
      const actividades = actividadIds.length > 0
        ? await this.actividadRepository.findBy({ id: In(actividadIds) })
        : [];

      if (actividadIds.length > 0 && actividades.length !== actividadIds.length) {
        throw new NotFoundException(`Una o mas actividades no se encontraron`);
      }

      reserva.actividades = actividades;
    }

    return this.reservaRepository.save(reserva);
  }

  public async remove(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);
    return this.reservaRepository.remove(reserva);
  }
}
