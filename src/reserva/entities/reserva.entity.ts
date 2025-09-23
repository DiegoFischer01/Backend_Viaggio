import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  idReserva: number;

  @Column()
  ciudad: string;

  @Column({ type: 'date' })
  fechaLlegada: Date;

  @Column({ type: 'date', nullable: true })
  fechaRegreso: Date;

  // @ManyToMany(() => Actividad, (actividad) => actividad.reservas)
  // actividades: Actividad[];

  // @ManyToOne(() => Hotel, (hotel) => hotel.reservas)
  // @JoinColumn()
  // hotel: Hotel;

  // @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  // @JoinColumn()
  // usuario: Usuario;
}
