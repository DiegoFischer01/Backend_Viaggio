import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error('Variables de entorno MAIL_USER y MAIL_PASS no están definidas');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // App Password
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error('ERROR SMTP:', error);
      } else {
        console.log('SMTP listo para enviar mails');
      }
    });
  }

  async enviarConfirmacion(destinatario: string, reservaId: number) {
    const info = await this.transporter.sendMail({
      from: `"Viaggio" <${process.env.MAIL_USER}>`,
      to: destinatario,
      subject: 'Confirmación de tu reserva',
      text: `Tu reserva con ID ${reservaId} fue confirmada.`,
      html: `<p>Tu reserva con <b>ID ${reservaId}</b> fue confirmada.</p>`,
    });

    console.log('Mensaje enviado: %s', info.messageId);
    return info;
  }
}
