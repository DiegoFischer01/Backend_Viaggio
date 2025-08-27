import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actividad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column()
  fecha: string;

  @Column('decimal')
  precio: number;
}