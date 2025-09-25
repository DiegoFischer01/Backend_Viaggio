import { Actividad } from 'src/actividad/entities/actividad.entity';
import { Hotel } from 'src/hoteles/entities/hoteles.entitys';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn()
  idReserva: number;

  @Column()
  ciudad: string;

  @Column({ type: 'date' })
  fechaLlegada: Date;

  @Column({ type: 'date', nullable: true })
  fechaRegreso: Date;

  @ManyToMany(() => Actividad, (actividad) => actividad.reservas)
  @JoinTable()
  actividades: Actividad[];

  @ManyToOne(() => Hotel, (hotel) => hotel.reservas)
  @JoinColumn()
  hotel: Hotel;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  @JoinColumn()
  usuario: Usuario;
}
