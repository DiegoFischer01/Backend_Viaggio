import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return '¡Servidor NestJS activo y conectado a Viaggio! 🔥';
  }
}