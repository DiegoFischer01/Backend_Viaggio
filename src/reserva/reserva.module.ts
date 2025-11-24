import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';

import { Reserva } from './entities/reserva.entity';
import { Hotel } from '../hoteles/entities/hoteles.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Actividad } from '../actividad/entities/actividad.entity';

import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva, Hotel, Usuario, Actividad]),
    MailModule,
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}

