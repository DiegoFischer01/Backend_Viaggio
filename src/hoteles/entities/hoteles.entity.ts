import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('hoteles')
export class Hotel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({nullable: true})
  direccion: string;

  @Column({nullable: true})
  categoria: string; // hotel, departamento, etc.

  @Column('decimal')
  precio: number;

  @Column({ type: 'date', nullable: true })
  reservadoDesde: Date;

  @Column({ type: 'date', nullable: true })
  reservadoHasta: Date;

  @Column({ nullable: true })
  imagenUrl: string;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  estrellas: number;

  @Column()
  imagenPrincipal: string;  

  @Column("simple-array", { nullable: true })
  imagenesExtras: string[];

  @Column("text")
  descripcion: string;

  @Column({ nullable: true })
  personas: number;

  @Column("simple-array", { nullable: true })
  servicios: string[];

  @OneToMany(() => Reserva, (reserva) => reserva.hotel)
  reservas: Reserva[];
}
