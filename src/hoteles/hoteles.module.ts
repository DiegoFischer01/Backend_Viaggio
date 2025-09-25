import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hoteles.entitys';
import { HotelesService } from './hoteles.service';
import { HotelesController } from './hoteles.controller';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Reserva])],
  providers: [HotelesService],
  controllers: [HotelesController],
  exports: [HotelesService], 
})
export class HotelesModule {}
