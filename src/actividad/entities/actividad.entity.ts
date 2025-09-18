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
  fecha: Date;

  @Column('decimal')
  precio: number;
}