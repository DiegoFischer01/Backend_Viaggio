import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { Reserva } from './entities/reserva.entity';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  async findAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Reserva> {
    return this.reservaService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservaDto: UpdateReservaDto,
  ): Promise<Reserva> {
    return this.reservaService.update(id, updateReservaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Reserva> {
    return this.reservaService.remove(id);
  }

  // End-point para enviar confirmación por mail
  @Post(':id/enviar-confirmacion')
  async enviarConfirmacion(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.enviarConfirmacion(id);
  }
}
