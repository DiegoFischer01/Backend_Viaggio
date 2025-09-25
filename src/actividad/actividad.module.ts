import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividad } from './entities/actividad.entity';
import { ActividadService } from './actividad.service';
import { ActividadController } from './actividad.controller';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Actividad, Reserva])],
  providers: [ActividadService],
  controllers: [ActividadController],
})
export class ActividadModule {}