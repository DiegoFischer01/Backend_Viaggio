import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column()
  fecha: Date;

  @Column('decimal')
  precio: number;

  @ManyToMany(() => Reserva, (reserva) => reserva.actividades)
  reservas: Reserva[];
}
