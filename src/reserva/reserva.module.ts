import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { Hotel } from 'src/hoteles/entities/hoteles.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Actividad } from 'src/actividad/entities/actividad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Hotel, Usuario, Actividad])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}