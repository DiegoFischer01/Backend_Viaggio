import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,     // smtp-relay.brevo.com
      port: Number(process.env.SMTP_PORT), // 587
      secure: false,
      auth: {
        user: process.env.SMTP_USER,   // 9d59df001@smtp-brevo.com
        pass: process.env.SMTP_PASS,   // tu SMTP KEY
      },
    });
  }

  async enviarConfirmacion(destinatario: string, reserva: Reserva) {
    // Aseguramos que las propiedades existan
    const hotelNombre = reserva.hotel?.nombre || 'No definido';
    const hotelDireccion = reserva.hotel?.direccion || 'No definida';
    const hotelPrecio = reserva.hotel?.precio ?? 0;

    const hotelImagen =
      reserva.hotel?.imagenPrincipal ||
      reserva.hotel?.imagenUrl ||
      'https://via.placeholder.com/600x300?text=Hotel+Viaggio';

    const usuarioNombre = reserva.usuario?.nombre || 'Usuario';

    const actividadesHtml =
      reserva.actividades?.length
        ? reserva.actividades.map(act =>
            `<li><b>${act.titulo || ''}</b>: ${act.descripcion || ''}</li>`
          ).join('')
        : '<li>No seleccionaste actividades</li>';

    const fechaLlegada = reserva.fechaLlegada
      ? new Date(reserva.fechaLlegada).toLocaleDateString()
      : 'No definida';

    const fechaRegreso = reserva.fechaRegreso
      ? new Date(reserva.fechaRegreso).toLocaleDateString()
      : 'No definida';

    let noches = 1;
    if (reserva.fechaLlegada && reserva.fechaRegreso) {
      const diff =
        (new Date(reserva.fechaRegreso).getTime() -
          new Date(reserva.fechaLlegada).getTime()) /
        (1000 * 60 * 60 * 24);
      noches = diff >= 1 ? diff : 1;
    }

    const total = hotelPrecio * noches;

    // HTML del mensaje (EL MISMO QUE TENÍAS)
    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:10px;">
        <h2 style="text-align:center; color:#333;">¡Tu reserva está confirmada!</h2>

        <p>Hola <b>${usuarioNombre}</b>, gracias por reservar con <b>Viaggio</b>.</p>

        <h3>Alojamiento</h3>
        <p><b>${hotelNombre}</b><br>
        Dirección: ${hotelDireccion}<br>
        Precio por noche: $${hotelPrecio}<br>
        Noches: ${noches}<br>
        <b>Total: $${total}</b></p>

        <img src="${hotelImagen}" style="width:100%; border-radius:8px; margin-bottom:15px;" />

        <h3>Fechas</h3>
        <p>Desde: ${fechaLlegada}<br>Hasta: ${fechaRegreso}</p>

        <h3>Actividades</h3>
        <ul>${actividadesHtml}</ul>

        <h3>Información de pago</h3>
        <p>Realizá la transferencia bancaria a:</p>
        <p>
          <b>Banco:</b> Banco Ejemplo<br>
          <b>CBU:</b> 1234567890123456789012<br>
          <b>Titular:</b> Viaggio SRL<br>
          <b>Monto total:</b> $${total}
        </p>

        <p style="text-align:center; margin-top:20px;">¡Te deseamos un excelente viaje!</p>
      </div>
    `;

    // ENVÍO DEL MAIL — EXACTAMENTE IGUAL A LO QUE YA TENÍAS
    const info = await this.transporter.sendMail({
      from: `"Viaggio" <${process.env.SMTP_USER}>`, // IMPORTANTE!!
      to: destinatario,
      subject: 'Resumen de tu reserva Viaggio',
      html,
    });

    console.log('Correo enviado correctamente:', info.messageId);
    return info;
  }
}
