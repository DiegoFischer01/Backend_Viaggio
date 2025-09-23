import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  @Get()
  getRoot(): string {
    return '¡Servidor NestJS activo y conectado a Viaggio! 🔥';
  }
}