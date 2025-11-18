import { Reserva } from 'src/reserva/entities/reserva.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nombre: string;

  @Column()
  password: string;

  @Column({ default: "user"})
  role: string;

  @OneToMany(() => Reserva, (reserva) => reserva.usuario)
  reservas: Reserva[];
}
