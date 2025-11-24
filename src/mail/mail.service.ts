import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    // Configuración del transporte
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', 
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER, 
        pass: process.env.MAIL_PASS, 
      },
    });
  }

  async enviarConfirmacion(destinatario: string, reservaId: number) {
    const info = await this.transporter.sendMail({
      from: '"Viaggio" <no-reply@viaggio.com>',
      to: destinatario,
      subject: 'Confirmación de tu reserva',
      text: `Tu reserva con ID ${reservaId} fue confirmada.`,
      html: `<p>Tu reserva con <b>ID ${reservaId}</b> fue confirmada.</p>`,
    });

    console.log('Mensaje enviado: %s', info.messageId);
    return info;
  }
}
