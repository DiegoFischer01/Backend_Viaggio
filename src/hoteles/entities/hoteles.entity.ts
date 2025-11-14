import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('hoteles')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  categoria: string; // hotel, departamento, etc.

  @Column('decimal')
  precio: number;

  @Column({ type: 'date', nullable: true })
  reservadoDesde: Date;

  @Column({ type: 'date', nullable: true })
  reservadoHasta: Date;

  @Column()
  imagenUrl: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  estrellas: number;

  @OneToMany(() => Reserva, (reserva) => reserva.hotel)
  reservas: Reserva[];
}
