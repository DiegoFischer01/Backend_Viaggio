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
    // Validar fecha
    const fechaLlegadaDate = new Date(createReservaDto.fechaLlegada);
    const fechaRegresoDate = createReservaDto.fechaRegreso
      ? new Date(createReservaDto.fechaRegreso)
      : null;

    if (fechaRegresoDate && fechaRegresoDate <= fechaLlegadaDate) {
      throw new BadRequestException(
        'La fecha de regreso debe ser posterior a la fecha de llegada',
      );
    }

    //Desestructuracion de createReservaDto en variables
    const { hotelId, usuarioId, actividadIds, ...reservaData } =
      createReservaDto;

    // Validar hotel
    const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
    if (!hotel) {
      throw new NotFoundException(
        `No se encuentra el Hotel con id: ${hotelId}`,
      );
    }

    // Validar usuario
    const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
    if (!usuario) {
      throw new NotFoundException(
        `No se encuentra el Usuario con id ${usuarioId}`,
      );
    }

    // Validar actividades (si es que esta presente en el DTO, ya que es opcional)
    const actividades =
      actividadIds && actividadIds.length > 0
        ? await this.actividadRepository.findBy({ id: In(actividadIds) })
        : [];

    if (actividadIds && actividades.length !== actividadIds.length) {
      throw new NotFoundException(
        `Una o mas actividades no fueron encontradas`,
      );
    }

    // Si todas las validaciones fueron exitosas crear la entidad con los datos recibidos en el DTO.
    const reservaEntity = this.reservaRepository.create({
      ...reservaData,
      hotel,
      usuario,
      actividades,
    });

    return this.reservaRepository.save(reservaEntity);
  }

  public async update(
    idReserva: number,
    updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    // Desestructuramos el DTO
    const { hotelId, usuarioId, actividadIds, ...updateData } =
      updateReservaDto;

    // Cargamos la reserva existente con sus relaciones
    const reserva = await this.reservaRepository.findOne({
      where: { idReserva },
      relations: ['hotel', 'usuario', 'actividades'],
    });
    if (!reserva) {
      throw new NotFoundException(
        `No se encontro la Reserva con el id: ${idReserva}`,
      );
    }

    // Actualizamos los campos simples
    Object.assign(reserva, updateData);

    // Actualizamos el hotel, si se envio en el Update DTO.
    if (hotelId !== undefined) {
      const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
      if (!hotel)
        throw new NotFoundException(`Hotel with id ${hotelId} not found`);
      reserva.hotel = hotel;
    }

    // Actualizamos el usuario, si se envio en el Update DTO.
    if (usuarioId !== undefined) {
      const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });
      if (!usuario)
        throw new NotFoundException(`Usuario with id ${usuarioId} not found`);
      reserva.usuario = usuario;
    }

    // Actualizamos las actividades, si se enviaron en el Update DTO.
    //Buscando en la DB las actividades presentes en el arreglo actividadIds.
    if (actividadIds !== undefined) {
      const actividades =
        actividadIds.length > 0
          ? await this.actividadRepository.findBy({ id: In(actividadIds) })
          : [];

      //Si no se encontraron TODAS las ids en la base de datos, tirar un error.
      if (
        actividadIds.length > 0 &&
        actividades.length !== actividadIds.length
      ) {
        throw new NotFoundException(`Una o mas actividades no se encontraron`);
      }

      reserva.actividades = actividades;
    }

    return this.reservaRepository.save(reserva);
  }

  public async remove(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);

    return await this.reservaRepository.remove(reserva);
  }
}
