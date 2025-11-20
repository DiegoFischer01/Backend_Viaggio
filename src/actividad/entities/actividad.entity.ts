import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity('actividades')
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ type: 'datetime', nullable: true })
  fecha?: Date | null;

  @Column('decimal', { nullable: true })
  precio?: number | null;

  @Column()
  imagenUrl: string;

  @ManyToMany(() => Reserva, (reserva) => reserva.actividades)
  reservas: Reserva[];
}
