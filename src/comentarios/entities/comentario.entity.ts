import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("comentarios")
export class Comentario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hotelId: number;

    @Column()
    usuarioId: number;

    @Column()
    usuarioEmail: string;

    @Column()
    usuarioNombre: string;

    @Column("text")
    mensaje: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    fecha: Date;
}
