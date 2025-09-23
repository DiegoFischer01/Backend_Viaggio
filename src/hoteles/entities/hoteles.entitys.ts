import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
