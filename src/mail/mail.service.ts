import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
/*
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }*/
 constructor() {
  console.log("MAIL_USER:", process.env.MAIL_USER);
  console.log("MAIL_PASS:", process.env.MAIL_PASS);

  this.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  this.transporter.verify((error, success) => {
    if (error) {
      console.error("ERROR SMTP:", error);
    } else {
      console.log("SMTP listo para enviar mails");
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
